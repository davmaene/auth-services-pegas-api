import express from 'express';
import { controllerUser } from '../__controlers/__controller.users.js';

export const __routesusers = express.Router();
__routesusers.post("/signin", controllerUser.onSignin ) 