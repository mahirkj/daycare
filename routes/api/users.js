const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
router.post(
    '/',
    auth,
    check('name', 'Name is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('role', 'Role is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;

        try {

            if (role === 'Parent') {
                let parent = await Parent.findOne({ email });
                let user = await User.findOne({ email });
                if (user || parent) {
                    return res.json({ error: 'User with this email already exists' });
                }

                parent = new Parent({
                    name,
                    email,
                    password,
                });

                const salt = await bcrypt.genSalt(10);

                parent.password = await bcrypt.hash(password, salt);
                await parent.save();
                res.json({ message: "User is Registered" });
            } else {
                let parent = await Parent.findOne({ email });
                let user = await User.findOne({ email });
                if (user || parent) {
                    return res.json({ error: 'User with this email already exists' });
                }

                user = new User({
                    name,
                    email,
                    password,
                    role
                });

                const salt = await bcrypt.genSalt(10);

                user.password = await bcrypt.hash(password, salt);
                await user.save();
                res.json({ message: "user is regestered" });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
router.get('/all_users', auth, async (req, res) => {
    const { search } = req.query;
    let allUser = []
    try {
        const user = await User.aggregate(
            [
                {
                    $match: { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] }
                }
            ]

        )
        for (const elemt of user) {
            allUser.push(elemt)
        }
        const parent = await Parent.aggregate(
            [
                {
                    $match: { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] }
                }
            ]

        )
        for (const elemt of parent) {
            allUser.push(elemt)
        }
        const countParent = await Parent.countDocuments(search ? { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] } : null);
        const countUser = await User.countDocuments(search ? { $or: [{ email: search }, { name: { $regex: '.*' + search + '.*' } }] } : null);

        res.json({ user: allUser, count: countParent + countUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/allTeacher', auth, async (req, res) => {
    try {
        const teacher = await User.find({ role: "Teacher" });
        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/allParent', auth, async (req, res) => {
    try {
        const teacher = await Parent.find();
        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.get('/dashboard', auth, async (req, res) => {
    try {
        const teacherCount = await User.countDocuments({ role: "Teacher" });
        const parentCount = await Parent.countDocuments();
        const childrenCount = await Children.countDocuments();
        const femaleChildren = await Children.countDocuments({ gender: 'Female' });
        const maleChildren = await Children.countDocuments({ gender: 'Male' });
        const otherChildren = await Children.countDocuments({ gender: 'Other' });
        const FIRST_MONTH = 1
        const LAST_MONTH = 12
        const MONTHS_ARRAY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let lastMonth = "2022-12-31T23:59:59"
        let firstMonth = "2022-01-01T00:00:00"
        const dataByMonth = await Children.aggregate([
            // {
            //     $match: {
            //         _id: { $ne: null },
            //         date: { $gte: firstMonth, $lte: lastMonth }
            //     }
            // },
            {
                $group: {
                    _id: { "year_month": { $substrCP: ["$date", 0, 7] } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year_month": 1 }
            },
            {
                $project: {
                    _id: 0,
                    count: 1,
                    month_year: {
                        $concat: [
                            { $arrayElemAt: [MONTHS_ARRAY, { $subtract: [{ $toInt: { $substrCP: ["$_id.year_month", 5, 2] } }, 1] }] },
                            "-",
                            { $substrCP: ["$_id.year_month", 0, 4] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    data: { $push: { k: "$month_year", v: "$count" } }
                }
            },
            {
                $addFields: {
                    start_year: { $substrCP: [firstMonth, 0, 4] },
                    end_year: { $substrCP: [lastMonth, 0, 4] },
                    months1: { $range: [{ $toInt: { $substrCP: [firstMonth, 5, 2] } }, { $add: [LAST_MONTH, 1] }] },
                    months2: { $range: [FIRST_MONTH, { $add: [{ $toInt: { $substrCP: [lastMonth, 5, 2] } }, 1] }] }
                }
            },
            {
                $addFields: {
                    template_data: {
                        $concatArrays: [
                            {
                                $map: {
                                    input: "$months1", as: "m1",
                                    in: {
                                        count: 0,
                                        month_year: {
                                            $concat: [{ $arrayElemAt: [MONTHS_ARRAY, { $subtract: ["$$m1", 1] }] }, "-", "$start_year"]
                                        }
                                    }
                                }
                            },
                            {
                                $map: {
                                    input: "$months2", as: "m2",
                                    in: {
                                        count: 0,
                                        month_year: {
                                            $concat: [{ $arrayElemAt: [MONTHS_ARRAY, { $subtract: ["$$m2", 1] }] }, "-", "$end_year"]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                $addFields: {
                    data: {
                        $map: {
                            input: "$template_data", as: "t",
                            in: {
                                k: "$$t.month_year",
                                v: {
                                    $reduce: {
                                        input: "$data", initialValue: 0,
                                        in: {
                                            $cond: [{ $eq: ["$$t.month_year", "$$this.k"] },
                                            { $add: ["$$this.v", "$$value"] },
                                            { $add: [0, "$$value"] }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    data: { $arrayToObject: "$data" },
                    _id: 0
                }
            }
        ])

        res.json(
            {
                teacherCount: teacherCount,
                parentCount: parentCount,
                childrenCount: childrenCount,
                femaleChildren: femaleChildren,
                maleChildren: maleChildren,
                otherChildren: otherChildren,
                dataByMonth: dataByMonth[0].data
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;