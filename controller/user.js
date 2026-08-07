const { generateToken } = require('../service/authenication.js');
const user = require('../models/user.js');
const bcrypt = require('bcrypt');

async function handlesignup(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render('signup', {
                message: 'Name, email, and password are required.',
                messageType: 'warning',
            });
        }

        if (password.length < 6) {
            return res.status(400).render('signup', {
                message: 'Password must be at least 6 characters long.',
                messageType: 'warning',
            });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).render('signup', {
                message: 'This email is already registered. Please use another email or login.',
                messageType: 'warning',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({
            name,
            email,
            password: hashedpassword,
        });

        const token = await generateToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
        });

        return res.redirect('/');
    } catch (err) {
        next(err);
    }
}

async function handlelogin(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please enter both email and password.',
                messageType: 'warning',
            });
        }

        const userData = await user.findOne({ email });
        if (!userData) {
            return res.status(401).render('login', {
                message: 'User not found. Please sign up first.',
                messageType: 'danger',
            });
        }

        const ismatch = await bcrypt.compare(password, userData.password);
        if (!ismatch) {
            return res.status(401).render('login', {
                message: 'Invalid password. Please try again.',
                messageType: 'danger',
            });
        }

        const token = await generateToken(userData);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
        });

        return res.redirect('/');
    } catch (err) {
        next(err);
    }
}

module.exports = { handlesignup, handlelogin };
