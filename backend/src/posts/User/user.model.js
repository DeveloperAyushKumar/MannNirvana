import mongoose from "mongoose";
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt' 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        lowercase:true,
        trim:true,
    },
    address: {
        type:String,
        required:true,
    },
    avatar:{
        type:String, //cloudinary url
        // required:true,
        
    },
    coins:{
        type : Number,
        default:0,
    }
},{timestamps:true})
// userSchema.pre("save",async function(next){
//     if(!this.isModified("password"))return next();
//     this.password=await bcrypt.hash(this.password,10);
//     next();

// })
// userSchema.methods.isPasswordCorrect=async function (password) {
// return await bcrypt.compare(password,this.password)    
// }
// userSchema.methods.generateAccessToken=function(){
//     return jwt.sign({
//         _id:this.id,
//         email:this.email,
//         username:this.username,
//         fullName:this.fullName
        
//     },process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }
// userSchema.methods.generateRefreshToken=function(){
//     return jwt.sign({
//         _id:this.id,
        
//     },process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

export const User=mongoose.model("User",userSchema)
