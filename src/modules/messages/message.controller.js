

export const sendMessage = (req, res, next) => {
    console.log('message')
    res.render('profile.ejs',{session:req.session});
}


export const getMessages = (req, res, next) => {
    if(req.session.loggedIn )
         res.render('messages.ejs',{session:req.session});
    else
    res.redirect('/messages/messages');

}


