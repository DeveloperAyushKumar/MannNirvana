import {Post,Comment} from './post.model.js';
import cloudinary from '../../../config/cloudStorage.js';
import fs from 'fs';

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
    const {text}=req.body;
    console.log(req.body)
    console.log(req.params)
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        const comment=new Comment({text,user:req.body.user._id,...(req.body.authorName&&{authorName :req.body.authorName })});
        post.comments.push(comment);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export {createPost,getPost,editPost,getAllPost,deletePost,likePost,commentPost}