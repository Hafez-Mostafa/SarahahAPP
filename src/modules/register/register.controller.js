import bcrypt from 'bcrypt'
import userModel from '../../../db/model/user.model.js'


export const register = (req, res, next) => {
    res.render('register.ejs', { session: req.session });
}



export const registerHandler = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const userexist = await userModel.findOne({ email: req.body.email });

        // If user already exists, render the registration page with an error
        if (userexist) {
            return res.render('/register', { error: 'Email already exists' });
        }

        const user = await userModel.create({ name, email, password });

        if (!user) {
            return res.render('/register', { error: 'Error creating new user' });
        }

        return res.redirect('/login');
    } catch (err) {
        return res.render('register', { error: 'An unexpected error occurred' });
    }
};



