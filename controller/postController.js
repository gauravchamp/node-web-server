const Post=require('../models/Post');

const create=async(req,res)=>{
    try{
        const user=await Post.findById({_id:req.user.id});
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
        else{
            // update
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.create=create;