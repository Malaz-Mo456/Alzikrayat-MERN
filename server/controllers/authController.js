import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

const publicUser = (user) => {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
        description: user.description,
        occupation: user.occupation
    };
};

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password,
            location, description, occupation } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            location,
            description,
            occupation
        });

        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: publicUser(user),
            token
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password'
            });
        }

        const token = createToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: publicUser(user),
            token
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};