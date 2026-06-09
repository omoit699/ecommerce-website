import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
    userId?: string;
}

class AuthController {
    private JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    async register(req: Request, res: Response) {
        try {
            const { username, email, password, confirmPassword } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const existingUser = await User.findOne({
                $or: [{ email }, { username }],
            });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const newUser = new User({ username, email, password });
            await newUser.save();

            const token = jwt.sign(
                { userId: newUser._id, email: newUser.email },
                this.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: { id: newUser._id, username: newUser.username, email: newUser.email },
            });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                this.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(200).json({
                message: 'Sign in successful',
                token,
                user: { id: user._id, username: user.username, email: user.email },
            });
        } catch (error) {
            res.status(500).json({ message: 'Error signing in', error });
        }
    }

    async getUser(req: AuthRequest, res: Response) {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user = await User.findById(userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            // In a real application, you might want to blacklist the token
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error logging out', error });
        }
    }
}

export default new AuthController();