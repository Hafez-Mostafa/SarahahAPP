import { Router } from "express";
import * as LC from './login.controller.js'

const route = Router();


route.get('/login', LC.login);
route.get('/logout', LC.logOut);
route.post('/loginHandler', LC.loginHandler);





export default route;
