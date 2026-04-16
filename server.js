import db from "./db.js"; 
import Student from "./models/student.js"; 
import User from "./models/users.js"; 
import express from 'express'; 
import { ObjectId } from 'mongodb';

import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';

const secret = "SuperSecrect$";

const app = express(); 
db(); //call db()
const port =8080; 

app.use(express.static("public")); 
app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 

app.set("view engine","pug"); 
app.set("views", "views"); 

//select all students
app.get("/",async (req,res)=>{
    try{
    const result= await Student.find({});
        res.send(result);
    }catch(err){
        res.send(err)
    }
}); 

//insert a student
app.post("/insert",async (req,res)=>{
    try{
    const result= await Student.insertOne(req.body);
        res.send(result);
    }catch(err){
        res.send(err)
    }
}); 

//register a student user
app.post("/register",async (req,res)=>{
    if(!req.body.username || !req.body.password){
        res.status(401).json({error:"username or password is missing"});
    return; 
    }
    try{
        const {username,password,status} = req.body;
        const passhash = bcrypt.hashSync(password,10); //cost factor: 10
        console.log("Passhash:"+passhash);
    const result= await User.insertOne({username,passhash,status});
        res.status(200).json(result);
    }catch(err){
        res.status(501).json(err);
    }
});

//login a student user
app.post("/login",async (req,res)=>{
    if(!req.body.username || !req.body.password){
        res.status(401).json({error:"username or password is missing"});
    return; 
    }
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username:username}); 
        // console.log("userdbhash:"+user.passhash);
        // console.log("username:"+user.username);

        if(bcrypt.compareSync(password,user.passhash)){
            const token = jwt.encode(username,secret);
            console.log(token);
            res.json({token});
        }else{
            res.status(401).json({error:"password did not match"});
        }
    }catch(err){
        res.status(501).json(err);
    }
});

//Status of a student user
app.get("/status",async (req,res)=>{
    if(!req.headers['x-auth']){
        res.status(401).json({error:"token is missing"});
    return; 
    }
    try{
        const token = req.headers['x-auth'];
        console.log("user sent token:"+token);
        const username = jwt.decode(token,secret);
        console.log("decoded username:"+username); 
        const user = await User.findOne({username}); 
   
        if(user){
            console.log(user.status);
            res.status(200).json({status:user.status});
        }else{
            res.status(401).json({error:"token did not match"});
        }
    }catch(err){
        res.status(501).json(err);
    }
});


//select a specific student by id
app.get("/student/:id",async (req,res)=>{
    const id = new ObjectId(req.params.id); 
    try{
    const result= await Student.find({_id:id});
        res.send(result);
    }catch(err){
        res.send(err)
    }
}); 

//delete a specific student by id
app.get("/delete/:id",async (req,res)=>{
    const id = new ObjectId(req.params.id); 
    try{
    const result= await Student.deleteOne({_id:id});
        res.send(result);
    }catch(err){
        res.send(err)
    }
});

//update a specific student by id
app.get("/update/:id/:name",async (req,res)=>{
    const {id,name} = req.params;
     
    try{
    const result= await Student.updateOne({_id:new ObjectId(id)},{$set:{name:name}});
        res.send(result);
    }catch(err){
        res.send(err)
    }
});

//update a specific student by id
app.post("/update",async (req,res)=>{
    const {id,name,dept_name, tot_credit} = req.body;
     
    try{
    const result= await Student.updateOne({_id:new ObjectId(id)},{$set:{name, dept_name, tot_credit}});
        res.send(result);
    }catch(err){
        res.send(err)
    }
});




//run the server
app.listen(port,(err)=>{
    if(err) console.log(err); 
    console.log("Server is running at port numnber: "+port);
})