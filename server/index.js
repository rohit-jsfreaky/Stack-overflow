import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv";
import userRoutes from './Routes/users.js';
import questionRoutes from "./Routes/Questions.js"
import answerRoutes from "./Routes/answers.js"



dotenv.config();

const app = express();

app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cors());


app.get("/",(req,res)=>{
    res.send("This is stack overflow clone API");

})

app.use('/User',userRoutes);
app.use('/questions',questionRoutes);    
app.use('/answer',answerRoutes);


const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL


mongoose.connect(DATABASE_URL)
.then(()=>app.listen(PORT,()=>{ console.log(`Server running on port ${PORT}`)}))
.catch((err)=>{console.log(err.message)});