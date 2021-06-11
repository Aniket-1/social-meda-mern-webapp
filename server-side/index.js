import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config();


app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.json({urlencoded: '30mb', extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, ()=>{console.log(`Connection Successfull!!Listening on port ${PORT}`)})
    ).catch((err)=> console.log(err.message));

mongoose.set('useFindAndModify', false);


