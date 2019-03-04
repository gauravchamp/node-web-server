const User=require('../models/User');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const config=require('../config/keys');
const jwt=require('jsonwebtoken');

// register user
const register=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({email:'Email already exists'});
        }
        else{
            const avatar=gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm'
            });
            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            });
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,async(err,hash)=>{
                    newUser.password=hash;
                    try{
                        const user=await newUser.save();
                        res.json(user);
                    }
                    catch(err){
                        console.log('err',err);
                    } 
                });
            });
        }
    }
    catch(err){
        console.log('err',err);
    }

};

// login user
const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
           return res.status(404).json({email:'User not found'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const payload={id:user.id,name:user.name,avatar:user.avatar};
            jwt.sign(payload,config.secret,{expiresIn:3600},(err,token)=>{
                if(err) console.log(err);
                res.json({
                    success:true,
                    token:`Bearer ${token}`
                });
            });
        }
        else{
            return res.status(400).json({password:'Password incoreect'});
        }
    }
    catch(err){
        console.log('err',err)
    }   
};

module.exports.register=register;
module.exports.login=login;