const User = require('../models/User')
const Post = require('../models/Post')

 const createPost = async (req,res) => {
    try {
        const {userId,description,picturePath} = req.body;
        const user =await User.findById(userId)

        const newPost = new Post({  
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            picturePath,
            userPicturePath: user.picturePath,
            location: user.location,
            description,
            likes : {},
            comments : [] 
        })
        await newPost.save()
        const post = await Post.find();
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({errors : error.message })
    }
}

const getFeedPosts = async (req,res) =>{
    try {
        const post = await Post.find();
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({errors : error.message})
    }
}
const getUserPosts = async (req,res) =>{
    try {
        const {userId} =req.params
        const post = await Post.find({userId :userId});
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({errors : error.message})
    }
}

const likePost = async (req,res) =>{
    try {
        const {postId} =req.params;
        const {userId} = req.body;
        const post = await Post.findById(postId)
        const isLiked = post.likes.get(userId);

        if(isLiked){//if liked ==> the action is to remove it 
            post.likes.delete(userId);
        }
        if(!isLiked){//if not liked ==> the action is to add like
            post.likes.set(userId,true);
        }
        //update the post with the new post likes
        const updatedPost = await Post.findByIdAndUpdate(postId,
            {likes:post.likes},
            {new:true}
        )
        res.status(201).json(updatedPost) //send to front
    } catch (error) {
        res.status(404).json({errors : error.message})
    }
}



module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost

}