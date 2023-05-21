import { completeCodeCountryToPhoneNumber } from "../__helpers/helper.fillphonenumber.js";
import axios from 'axios';

const WithKeccel = async ({ to, content }, cb) => {
    try {
        await axios({
            method: "POST",
            url: 'https://api.keccel.com/sms/v2/message.asp',
            data: 
            {
                "to": completeCodeCountryToPhoneNumber({ phone: to }),
                "message": content,
                "from": process.env.SENDERID,
                "token": "GHPK3A29WFG6Q4K"
            }
        })
        .then(sms => {
            console.log('====================================');
            console.log(" Message sent with KECCEL => ", sms['data']);
            console.log('====================================');
            cb(undefined, sms['data'])
        })
        .catch(er => {
            cb(er, undefined)
        })
    } catch (error) {
        cb(error, undefined)
    }
};

const onSendSMS = ({ to, content, cb }) => {
    const provider = parseInt(process.env.SMSPROVIDER);
    switch (provider) {
        case 1:
            WithKeccel({ to, content }, (err, done) => {
                return cb(err, done)
            })
            break;
    
        default:
            WithKeccel({ to, content }, (err, done) => {
                return cb(err, done)
            })
            break;
    }
}

export const SMS = {
    onSendSMS
}