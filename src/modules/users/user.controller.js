

import userModel from '../../../db/model/user.model.js'


export const register = (req, res, next) => {
    res.render('register.ejs', { session: req.session });
}

export const login = (req, res, next) => {
    res.render('login.ejs', { error: req.query.error, session: req.session });
}




export const loginHandler = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.render('login.ejs', { error: 'email or password not correct' });
        }
        req.session.loggedIn = true;
        req.session.userId = user._id;
        req.session.userName = user.name;
        return res.redirect('/home',);

    } catch (error) {
        // Handle any other errors
        console.error(error);
        return next(error);
    }
};



export const registerHandler = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const userexist = await userModel.findOne({ email: req.body.email });

        // If user already exists, render the registration page with an error
        if (userexist) {
            return res.render('register', { error: 'Email already exists' });
        }

        const user = await userModel.create({ name, email, password });

        if (!user) {
            return res.render('register', { error: 'Error creating new user' });
        }

        return res.redirect('/users/login');
    } catch (err) {
        return res.render('register', { error: 'An unexpected error occurred' });
    }
};



export const logOut = (req, res, next) => {
    if(req.session){req.session.destroy((err) => {
        res.redirect('/users/login');
    })}
    

}