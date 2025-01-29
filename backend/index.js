import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import postRoutes from './src/posts/post/post.route.js';

const app=express();
const PORT=process.env.PORT || 5000;
//Middlewares
app.use(express.json());


//routes
// app.use('/',(req,res)=>{
//     res.send('Hello World');
// })

app.use('/posts',postRoutes)


//Connect to DB
async function main(){
    await mongoose.connect(process.env.DB_URL);
}
main().then(()=>console.log('Db Connected')).catch(err=>console.log(err));

app.listen(PORT,()=>{console.log('App is lisenning ')});