const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ChildrenSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    parent:{
        type:Schema.Types.ObjectId,
        ref : "Parent"
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = Children = mongoose.model('Children',ChildrenSchema);