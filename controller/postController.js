const Post=require('../models/Post');

const create=async(req,res)=>{
    try{
        const user=await Post.findOne({user:req.user.id});
        if(!user){
            // create
            const userId=req.user.id;
            const {title,body,slug}=req.body;
            const newPost=new Post({
                user:userId,
                title,
                body,
                slug
            });
            const post=await newPost.save();
            res.json(post);
        }
    }
    catch(err){
        console.log(err);
    }
}

const update=async(req,res)=>{
    try{
        const user=await Post.findOne({user:req.user.id});
        if(user){
            const postId=req.params.id;
            const postBody={title,body,slug}=req.body;
            const post=await Post.findByIdAndUpdate(postId,
                {$set:postBody}
            );
            res.json(post);
        }
    }
    catch(err){
        console.log(err);
    }
};

const fetch=async(req,res)=>{
    try{
        const posts=await Post.find();
        res.json(posts);
    }
    catch(err){
        console.log(err)
    }
};

const del=async(req,res)=>{
    try{
        const postId=req.params.id;
        const post=await Post.findByIdAndRemove(postId);
        res.json({message:'delete success'},post);
    }
    catch(err){
        console.log(err)
    }
};

module.exports.create=create;
module.exports.update=update;
module.exports.fetch=fetch;
module.exports.del=del;