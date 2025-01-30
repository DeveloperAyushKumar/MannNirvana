import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import postRoutes from './src/posts/post/post.route.js';
import bodyParser from 'body-parser';
import consultantRoutes from './src/Consultant/Consultant.route.js';

const app=express();
const PORT=process.env.PORT || 5000;
//Middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  // preflight 
  app.options("*", cors());

//Routes
app.use('/posts',postRoutes)
app.use('/consultant',consultantRoutes)


//Connect to DB
async function main(){
    await mongoose.connect(process.env.DB_URL);
}
main().then(()=>console.log('Db Connected')).catch(err=>console.log(err));

app.listen(PORT,()=>{console.log('App is lisenning ')});