import bcrypt from 'bcrypt'
import userModel from '../../../db/model/user.model.js'


export const login = (req, res, next) => {
    res.render('login.ejs', { error: req.query.error, session: req.session });
}

export const loginHandler = async (req, res, next) => {
    const { password, email } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login.ejs',
                { error: 'Invalid email or password' },
                { session: req.session });
        }
        req.session.loggedIn = true;
        req.session.userId = user._id;
        req.session.userName = user.name;
        return res.redirect('/');

    } catch (error) {
        console.error(error);
        return next(error);
    }
};





export const logOut = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            res.redirect('/login');
        })
    }


}