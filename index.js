
import express from 'express'
import session from 'express-session';
import sessionConnect from 'connect-mongodb-session';

import connectionDB from './db/connetionDB.js';

import homeRouter from './src/modules/home/home.route.js'
import userRouter from './src/modules/users/user.route.js'
import messageRouter from './src/modules/messages/message.route.js'
import otherRouter from './src/modules/others/others.route.js'





const app = express()
connectionDB()


const MongoDBStore = sessionConnect(session);

let store = new MongoDBStore({
    uri: process.env.MONGO_CLOUD_URL,
    collection: 'mySessions'
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});
app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store,

    resave: true,
    saveUninitialized: true
}));



app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


app.use('/home', homeRouter)
app.use('/users', userRouter)
app.use('/messages', messageRouter)
app.use('/others', otherRouter)



// app.use('/',(req,res,next)=>{
//     res.status(200).json({mag:"sarahah App"})
// })






app.get('*', (req, res, next) => {
    return res.status(404).json({ msg: `Invalid URL : ${req.originalUrl}` })
})

const PORT = process.env.PORT || 3100
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})