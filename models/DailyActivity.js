const mongoose = require('mongoose');
const Schema = mongoose.Schema
const moment = require('moment');

const DailyActivitySchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },
    activity:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default:moment().format('YYYY-MM-DD')
    },
    createdOn:{
        type: Date,
        default:Date.now()
    }
});

module.exports = DailyActivity = mongoose.model('DailyActivity',DailyActivitySchema);