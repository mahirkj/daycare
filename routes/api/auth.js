const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Parent = require('../../models/Parent');

router.post('/', check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const role = ""
    const { email, password } = req.body;
    let user = '';
    try {
        user = await User.findOne({ email });

        if (!user) {
            user = await Parent.findOne({ email });
            if (!user) {
                return res.json({ message: 'Invalid Credentials' });
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res

                .json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: user.role, name: user.name, user_id: user._id, status: 1 });
            }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

module.exports = router;