const mongoose=require('mongoose')
const postSchema = new mongoose.Schema({
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogAuthor : {
        type: String,
        required:true
    }, 
    blogTitle: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,      
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
});
module.exports= mongoose.model('Post', postSchema);
