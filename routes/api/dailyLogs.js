const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const moment = require('moment');
const DailyActivity = require('../../models/DailyActivity');
const Attendance = require('../../models/Attendance');
const Children = require('../../models/Children');
const DailyLog = require('../../models/DailyLog');
const nodemailer = require("nodemailer");

router.post(
    '/generateLogs', auth, async (req, res) => {
        const formatDate = moment().format('YYYY-MM-DD');
        try {
            const children = await Children.find();
            for (const elemt of children) {
                let logExist = await DailyLog.findOne({ date: formatDate, children: elemt._id });
                if (!logExist) {
                    let dailyActivity = await DailyActivity.findOne({ date: formatDate, user: elemt.user });
                    let attendance = await Attendance.findOne({ date: formatDate, children: elemt._id });
                    let logs = new DailyLog({
                        user: elemt?.user,
                        children: elemt?._id,
                        parent: elemt?.parent,
                        dailyActivity: dailyActivity?._id,
                        attendance: attendance?._id
                    });
                    await logs.save();
                }
            }

            logs = await DailyLog.find({ date: formatDate })
                .populate('user')
                .populate('children')
                .populate('parent')
                .populate('dailyActivity')
                .populate('attendance');
            for (const elemt of logs) {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: '', // generated ethereal user
                        pass: '', // generated ethereal password
                    },
                });

                await transporter.sendMail({
                    from: '<aliniazisk@gmail.com>',
                    to: elemt?.parent?.email,
                    subject: "Daily Reports",
                    text: "Daily Reports",
                    html: `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <!-- Logo -->
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <!-- Email Content -->
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px; background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);padding:0 40px;">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <!-- Title -->
                                                <tr>
                                                    <td style="padding:0 15px; text-align:center;">
                                                        <h1 style="color:#1e1e2d; font-weight:400; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Daily Reports</h1>
                                                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; 
                                                        width:100px;"></span>
                                                    </td>
                                                </tr>
                                                <!-- Details Table -->
                                                <tr>
                                                    <td>
                                                        <table cellpadding="0" cellspacing="0"
                                                            style="width: 100%; border: 1px solid #ededed">
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                                        Children Name:</td>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                        ${elemt?.children?.fullName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                                        Teacher Name:</td>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                        ${elemt?.user?.name}</td>
                                                                </tr>
                                                                <tr>
                                                                <td
                                                                    style="padding: 10px; border-bottom: 1px solid #ededed;border-right: 1px solid #ededed; width: 35%;font-weight:500; color:rgba(0,0,0,.64)">
                                                                    Actitvity:</td>
                                                                <td style="padding: 10px; color: #455056; border-bottom: 1px solid #ededed;">
                                                                ${elemt?.dailyActivity?.activity}
                                                                </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed;border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                                        Check in Time:</td>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                        ${moment(elemt?.attendance?.checkIn).format("hh:mm:ss a")}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        style="padding: 10px;  border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%;font-weight:500; color:rgba(0,0,0,.64)">
                                                                       Check Out Time:</td>
                                                                    <td
                                                                        style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                        ${moment(elemt?.attendance?.checkOut).format("hh:mm:ss a")}</td>
                                                                </tr>
                                                                <tr>
                                                                <td
                                                                    style="padding: 10px; border-bottom: 1px solid #ededed; border-right: 1px solid #ededed; width: 35%; font-weight:500; color:rgba(0,0,0,.64)">
                                                                    Date:</td>
                                                                <td
                                                                    style="padding: 10px; border-bottom: 1px solid #ededed; color: #455056;">
                                                                    ${moment(elemt?.attendance?.date).format("YYYY-MM-DD")}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>`,
                });
            }


            res.json({ success: "logs send" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
router.get('/allLogs', auth, async (req, res) => {
    const { date, id, role } = req.query
    let logs = []
    const formatDate = moment(date).format('YYYY-MM-DD');
    console.log('date', date, formatDate);
    try {
        if (role === 'Teacher') {
            logs = await DailyLog.find(date ? { user: id, date: formatDate } : { user: id })
                .populate('user')
                .populate('children')
                .populate('parent')
                .populate('dailyActivity')
                .populate('attendance').sort({ date: -1 });
        }
        if (role === 'Parent') {
            logs = await DailyLog.find(date ? { parent: id, date: formatDate } : { parent: id })
                .populate('user')
                .populate('children')
                .populate('parent')
                .populate('dailyActivity')
                .populate('attendance').sort({ date: -1 });
        }
        if (role === 'Admin') {
            logs = await DailyLog.find(date ? { date: formatDate } : null)
                .populate('user')
                .populate('children')
                .populate('parent')
                .populate('dailyActivity')
                .populate('attendance').sort({ date: -1 });
        }
        res.json({ logs: logs });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;