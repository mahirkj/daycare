const mongoose = require('mongoose');
const Schema = mongoose.Schema
const moment = require('moment');

const DailyLogSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    children: {
        type: Schema.Types.ObjectId,
        ref: "Children"
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Parent"
    },
    dailyActivity: {
        type: Schema.Types.ObjectId,
        ref: "DailyActivity"
    },
    attendance: {
        type: Schema.Types.ObjectId,
        ref: "Attendance"
    },
    date: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = DailyLog = mongoose.model('DailyLog', DailyLogSchema);