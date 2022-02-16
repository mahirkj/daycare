const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const Children = require('../../models/Children');
const Attendance = require('../../models/Attendance');
const User = require('../../models/User');
router.post(
  '/',
  auth,
  check('fullName', 'Full name is required').notEmpty(),
  check('age', 'Age is required').notEmpty(),
  check('gender', 'Gender is required').notEmpty(),
  check('user', 'Role is required').notEmpty(),
  check('parent', 'Role is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, age, gender, user, parent } = req.body;

    try {
      let children = new Children({
        fullName,
        age,
        gender,
        user,
        parent
      });
      await children.save();

      res.json("Children is Added");


    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
router.get('/', auth, async (req, res) => {
  const { search } = req.query;
  try {
    const children = await Children.find(search ? { fullName: { $regex: '.*' + search + '.*' } } : null).populate('user').populate('parent').sort({ date: -1 });
    const count = await Children.countDocuments(search ? { fullName: { $regex: '.*' + search + '.*' } } : null);
    res.json({ children: children, count: count });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/assignChildren', auth, async (req, res) => {
  const { id, role, fullName } = req.query
  let children = []
  let user = {}
  try {
    if (role === 'Teacher') {
      user = await User.findOne({ _id: id });
      children = await Children.find(fullName ? { fullName: { $regex: '.*' + fullName + '.*' }, user: id } : { user: id }).populate('user').populate('parent');
    }
    if (role === 'Parent') {
      user = await Parent.findOne({ _id: id });
      children = await Children.find(fullName ? { fullName: { $regex: '.*' + fullName + '.*' }, parent: id } : { parent: id }).populate('user').populate('parent');;
    }
    if (role === 'Admin') {
      user = await User.findOne({ _id: id });
    }
    res.json({ user: user, children: children });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/childrenDetail', auth, async (req, res) => {
  const { id } = req.query
  let children = {}
  let attendance = []
  try {
    attendance = await Attendance.find({children:id}).populate('children').sort({ date: -1 });
    children = await Children.findOne({_id:id}).populate('user').populate('parent');
    res.json({children: children,attendance:attendance});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.get('/:id', auth, async (req, res) => {
  try {
    const children = await Children.findById(req.params.id);

    if (!children) {
      return res.status(404).json({ msg: 'children not found' });
    }

    res.json(children);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});
module.exports = router;