const mongoose = require('mongoose');
const Schema = mongoose.Schema
const moment = require('moment');

const AttendanceSchema = new mongoose.Schema({
    children: {
        type: Schema.Types.ObjectId,
        ref: "Children"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    checkIn: {
        type: Date,
        required: false,
        default: null
    },
    checkOut: {
        type: Date,
        required: false,
        default: null
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

module.exports = Attendance = mongoose.model('Attendance', AttendanceSchema);