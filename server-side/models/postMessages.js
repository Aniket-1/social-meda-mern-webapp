import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String, 
    tags: [String],
    creator: String,
    selectedFile: String,
    likes:{
        type: [String],
        default: []
    }
}, {timestamps: true}
);

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;