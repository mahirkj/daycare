const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'Parent'
    },
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports = Parent = mongoose.model('Parent',ParentSchema);