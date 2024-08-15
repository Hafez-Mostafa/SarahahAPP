import messageModel from '../../../db/model/message.model.js'
import QRCode from 'qrcode'




export const sendMessage = async (req, res, next) => {
 await messageModel.create({ content: req.body.content, user: req.session.userId });
 req.session.msg = 'sent';
    res.redirect(`/messages/profile`);
}



export const getprofile = async (req, res, next) => {
    let url = `${req.protocol}://${req.get('host')}/others/user/${req.session.userId}`
    let qrCodeUrl;
    QRCode.toDataURL(url)
    .then(url=>{
        qrCodeUrl=url
    }).catch(err=>{
        console.error(err)
    })
    try {


        const messages = await messageModel.find({ user: req.session.userId });
        if (req.session.loggedIn) {
            res.render('profile.ejs', { session: req.session, messages, url,qrCodeUrl });
        } else {
            res.redirect('/messages/profile', { error: "You are not Authenticated" });
        }
    } catch (error) {
        next(error);
    }
};
