import express from 'express';
import { __routesusers } from './routes.users.js';

export const __routes = express.Router();
__routes.use("/auth", __routesusers )
