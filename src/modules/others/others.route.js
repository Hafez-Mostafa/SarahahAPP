import { Router } from "express";
import * as OC from './others.controller.js'

const route = Router();



 route.get('/user/:id', OC.getUser);



export default route;
