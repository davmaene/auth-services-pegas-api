import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

const middle = 2;

dotenv.config();

const limiter = rateLimit({
	windowMs: process.env.APPRATELIMITTIME * ( 60 * 1000 ),
	max: process.env.APPRATELIMITREQUESTNUMBER,
	standardHeaders: false,
	legacyHeaders: true,
    message: {
        status: 402,
        message: `You have reached the maximum number of request please for ${process.env.APPRATELIMITTIME} minutes`,
        data: {}
    }
})

const limiterOnLogin = rateLimit({
	windowMs: (parseInt(process.env.APPRATELIMITTIME) * ( 60 * 1000 )) / middle,
	max: parseInt(process.env.APPRATELIMITREQUESTNUMBER) / middle,
	standardHeaders: false,
	legacyHeaders: true,
    message: {
        status: 402,
        message: `You have reached the maximum number of request please for ${parseInt(process.env.APPRATELIMITTIME) / middle} minutes`,
        data: {}
    }
})