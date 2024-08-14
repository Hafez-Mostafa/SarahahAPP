import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    email: string, 
    password: string
})


const messageModel = mongoose.model("Message", messageSchema)


export default messageModel