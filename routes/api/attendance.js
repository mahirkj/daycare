const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const moment = require('moment');
const Attendance = require('../../models/Attendance');
const Children = require('../../models/Children');


router.get(
    '/allAttendance', auth, async (req, res) => {
        const { date, user } = req.query;
        const formatDate = moment(date).format('YYYY-MM-DD');
        try {
            const attendance = await Attendance.find({ user: user, date: formatDate }).populate('children').sort({ date: -1 });
            const count = await Attendance.countDocuments({ user: user, date: formatDate });
            res.json({ attendance: attendance, count: count });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
router.post('/updateAttendace', auth, async (req, res) => {
    const { children, checkTime, time } = req.body;
    const date = moment().format('YYYY-MM-DD');
    try {
        for (const elemt of children) {
            if (checkTime === 'checkIn') {
                let attendanceExist = await Attendance.findOne({ date: date, children: elemt });
                if (attendanceExist) {
                    await Attendance.findOneAndUpdate({ children: elemt, date: date }, { checkIn: time }, {
                        new: true
                    });
                }
            }
            if (checkTime === 'checkOut') {
                let attendanceExist = await Attendance.findOne({ date: date, children: elemt });
                if (attendanceExist) {
                    await Attendance.findOneAndUpdate({ children: elemt, date: date }, { checkOut: time }, {
                        new: true
                    });
                }
            }
        }
        res.json({ message: 'Attendance Added' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/generateAttendance', auth, async (req, res) => {
    const { user, checkTime } = req.body;
    const date = moment().format('YYYY-MM-DD');
    let attendance = {}
    let count = 0
    try {
        if (checkTime === 'checkIn') {
            const children = await Children.find({ user });
            for (const elemt of children) {
                let attendanceExist = await Attendance.findOne({ date, children: elemt._id });
                if (!attendanceExist) {
                    let attendance = new Attendance({
                        children: elemt._id,
                        date: date,
                        user: user
                    });
                    await attendance.save();
                }
            }
            attendance = await Attendance.find({ date: date, checkIn: null, checkOut: null }).populate('children');
            count = await Attendance.countDocuments({ date: date, checkIn: null, checkOut: null });
        }
        if (checkTime === 'checkOut') {
            attendance = await Attendance.find({ date: date, checkIn: { $ne: null }, checkOut: null }).populate('children');
            count = await Attendance.countDocuments({ date: date, checkIn: { $ne: null }, checkOut: null });
        }
        res.json({ attendance: attendance, count: count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;