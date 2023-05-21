import express from 'express';
import { controllerUser } from '../__controlers/__controller.users.js';
import { limiter, limiterOnLogin } from '../__ware/ware.ratelimit.js';

export const __routesusers = express.Router();
__routesusers.post("/signin", limiterOnLogin, controllerUser.onSignin ) 
__routesusers.post("/signup", limiter, controllerUser.onSignup ) 
__routesusers.put("/verify", limiter, controllerUser.onVerify ) 