import {Post,Comment} from './post.model.js';
import cloudinary from '../../../config/cloudStorage.js';
import axios from 'axios';
import fs from 'fs';

const API_KEY = process.env.SEARCH_API_KEY; 
const URL =` https://newsapi.org/v2/everything?q=women%20mental%20health&sortBy=publishedAt&apiKey=${API_KEY}`; 
const hateSpeechUrl = process.env.HATE_SPEECH_URL;

const createPost=async(req,res)=>{
    try {
    const {content,tags,image_file} = req.body;
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(expirationDate.getDate() + 90);
    const expirationDateString = expirationDate.toISOString();
    const author=req.body.user._id;
    if(image_file){
        cloudinary.uploader.upload(image_file.image, {
            upload_preset: 'unsigned_upload',
            folder: 'mann_nirvana',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            expires_at: expirationDateString
        }, async function (err, result) {
            if (err) {
                console.log("failure", err);
                return res.status(500).json({ ans: "fail" });
            } else {
                const post= await Post.create({
                    content: content,
                    tags: tags,
                    image: result.secure_url,
                    author: author
                });
    
                if(!post) res.status(400).json({message:"Post not created"});
                res.status(201).json(post);
            }
        });     
    }
    else{
        const post= await Post.create({
            content: content,
            tags: tags,
            author: author
        });

        if(!post) res.status(400).json({message:"Post not created"});
        res.status(201).json(post);
    }}
    catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getPost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id).populate('author').populate('comments.user');
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const editPost=async(req,res)=>{
    try {
        const {content,tags,image}=req.body;
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        post.content=content;
        post.tags=tags;
        post.image=image;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getAllPost=async(req,res)=>{
    try {
        const posts=await Post.find().populate('author');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deletePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        await post.remove();
        res.status(200).json({message:"Post deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const likePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        if(post.likes.includes(req.body.user._id)){
            return res.status(400).json({message:"You already liked this post"})
        }
        post.likes.push(req.body.user._id);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const commentPost=async(req,res)=>{
    const {text,user}=req.body;
    // console.log(req.body)

    // console.log(req.params)
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        const comment=new Comment({text,user:user._id,});
        // console.log(comment)
        post.comments.push(comment);
        await post.save();
        // console.log(comment)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getNews = async(req, res) => {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
          res.status(500).json({message: "unable to fetch news"});
        }
    
        const data = await response.json();
        res.status(200).json({message: "fetched successfully" , articles: data.articles || []});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

const detectHateSpeech = async (req, res) => {
    try {
        const { text } = req.body; // Extract text from request body
      
        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const hateResponse = await axios.post(`${hateSpeechUrl}/analyze-text/`, 
            { text }, // Pass text properly
            { headers: { "Content-Type": "application/json" } }
        );

        res.status(hateResponse.status).json(hateResponse.data);
    } catch (err) {
        console.error("Error detecting hate speech:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {createPost,getPost,detectHateSpeech,editPost,getNews,getAllPost,deletePost,likePost,commentPost}