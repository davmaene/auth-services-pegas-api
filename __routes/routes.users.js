import express from 'express';
import { controllerUser } from '../__controlers/__controller.users.js';
import { limiterOnLogin } from '../__ware/ware.ratelimit.js';

export const __routesusers = express.Router();
__routesusers.post("/signin", limiterOnLogin, controllerUser.onSignin ) 