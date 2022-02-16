const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const moment = require('moment');
const DailyActivity = require('../../models/DailyActivity');
const Children = require('../../models/Children');

router.post(
    '/insert',
    auth,
    check('user', 'teacher id is required').notEmpty(),
    check('activity', 'activity is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user, activity } = req.body;
        const date = moment().format('YYYY-MM-DD');
        try {
            let activiytExist = await DailyActivity.find({ date, user });
            if (activiytExist.length > 0) {
                res.json({ message: "Activity for this date exists" });
            } else {
                let Activity = new DailyActivity({
                    user: user,
                    activity: activity,
                    date: date
                });
                await Activity.save();
                res.json({ message: "Activity added" });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
router.get(
    '/activityList', auth, async (req, res) => {
        const { user, date } = req.query;
        const formatDate = moment(date).format('YYYY-MM-DD');

        try {
            const activity = await DailyActivity.find(date ? { user: user, date: formatDate } : { user: user }).sort({ date: -1 });
            const count = await DailyActivity.countDocuments(date ? { user: user, date: formatDate } : { user: user });
            res.json({ activity: activity, count: count });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;