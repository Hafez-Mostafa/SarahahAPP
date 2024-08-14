import { Router } from "express";
import * as UC from './user.controller.js'

const route = Router();

// This handles the /home route


route.get('/login', UC.login);

route.post('/loginHandler', UC.loginHandler);


route.get('/register', UC.register);
route.post('/registerHandler', UC.registerHandler);




export default route;
