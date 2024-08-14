import { Router } from "express";
import * as MC from './message.controller.js'

const route = Router();

// This handles the /home route
route.get('/profile/:id', MC.sendMessage);

route.get('/getMessages', MC.getMessages);

export default route;
