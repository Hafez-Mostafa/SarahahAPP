import { Router } from "express";
import * as UC from './user.controller.js'

const route = Router();
route.get('/user/:id', UC.getUser);
 
export default route;
