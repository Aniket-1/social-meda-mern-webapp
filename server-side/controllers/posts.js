import PostMessage from '../models/postMessages.js'
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try{
        const postMsg = await PostMessage.find();
        res.status(200).json(postMsg)
    }catch(error){
        // console.log(error.message);
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    let response = {}
    //console.log("Creating Post", JSON.stringify(post));
    try{
        if ( post.creator == ''){
            response.success = false;
            response.message = "Creator Cant be empty"
            return res.send(201).send(response)
        }
        const newPost = new PostMessage(post);
        //console.log("new Post selected file", newPost);
        await newPost.save();
        return res.status(201).json(newPost);
    }catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

export const updatePost = async (req, res) => {
    const posts = req.body;
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){ return res.status(404).send('No Post By This Id'); }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...posts, _id}, {new: true});
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){ return res.status(404).send('No Post By This Id'); }
    await PostMessage.findByIdAndRemove(id);
    res.status(200).send('Deleted Successfully');
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    }
    else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}