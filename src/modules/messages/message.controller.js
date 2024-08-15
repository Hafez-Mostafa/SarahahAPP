import messageModel from '../../../db/model/message.model.js'





export const sendMessage = async (req, res, next) => {
 await messageModel.create({ content: req.body.content, user: req.session.userId });
 req.session.msg = 'sent';
    res.redirect(`/messages/profile`);
}



export const getprofile = async (req, res, next) => {

    try {

        let url = `${req.protocol}://${req.get('host')}`

        const messages = await messageModel.find({ user: req.session.userId });
        if (req.session.loggedIn) {
            res.render('profile.ejs', { session: req.session, messages, url });
        } else {
            res.redirect('/messages/profile', { error: "You are not Authenticated" });
        }
    } catch (error) {
        next(error);
    }
};
