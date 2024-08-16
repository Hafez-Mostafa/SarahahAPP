import bcrypt from 'bcrypt';
import userModel from '../../../db/model/user.model.js';

export const login = (req, res, next) => {
    res.render('login', { error: req.query.error,
                         session: req.session });
};

export const loginHandler = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        
        // Check if the user exists and the password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { error: 'Invalid email or password', session: req.session });
        }

        // Set session data
        req.session.loggedIn = true;
        req.session.userId = user._id;
        req.session.userName = user.name;
        req.session.userEmail = user.email;

        return res.redirect('/');

    } catch (error) {
        console.error(error);
        return next(error);
    }
};

export const logOut = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return next(err);
            }
            res.redirect('/login');
        });
    }
};
