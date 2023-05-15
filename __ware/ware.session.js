import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { optionsCookies } from '../__helpers/helper.authandtoken.js';
import { excludedRoutes } from '../__helpers/helper.authandtoken.js';

dotenv.config();

export const tokenGenerate = async ({ data }, cb) => {
    jwt.sign(
        {
            data
        }, process.env.APPAPIKEY,
        {
            expiresIn: '1h',
        }, (err, encoded) => {
            cb(err, encoded)
        }
    )
};

export const tokenVerify = async ({ url, token }, cb) => {
    const _routes = excludedRoutes;
    if(_routes.indexOf(url) !== -1) return cb(undefined, true);
    else{
        jwt.verify(token, process.env.APPAPIKEY, (err, decoded) => {
            console.log(decoded)
            cb(err, decoded)
        });
    }
};