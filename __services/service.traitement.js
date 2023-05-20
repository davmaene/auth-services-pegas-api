import { ResponseInterne } from "../__helpers/helper.serverinterneresponse.js";
import { __User } from "../__models/model.user.js"
import { Op } from "sequelize";
import { tokenGenerate } from "../__ware/ware.session.js";
import { comparePWD } from "../__helpers/helper.password.js";
import { fillphone } from "../__helpers/helper.fillphonenumber.js";
import { loggerSystemCrached } from "../__helpers/helper.logwriterfile.js";
import { Checker } from "../__ware/ware.userchecker.js";
import { __Extrasinfos } from "../__models/mode.extrasinfos.js";
import { __Cridentials } from "../__models/model.cridentials.js";
import { hashPWD } from "../__helpers/helper.password.js";
import { momentNow } from "../__helpers/helper.moment.js";

export const Service = {
    onLogin: async ({ input, callBack }) => {
        const { phone, password } = input;
        try {
            __User.findOne({
                where: {
                    [Op.or]: [
                        { phone: fillphone({ phone }) },
                        { email: phone.toString().toLowerCase() }
                    ]
                }
            })
            .then(_user => {
                if(_user instanceof __User){
                    comparePWD({ plaintext: password, hashedtext: _user && _user['password'] }, (err, done) => {
                        if(done){
                            const { verified } = _user.toJSON();
                            if(verified === 1){
                                tokenGenerate({ data: _user && _user['phone'] }, (err, done) => {
                                    if(done){
                                        return callBack(ResponseInterne({ status: 200, body: { ..._user.toJSON(), token: done } }))
                                    }else{
                                        return callBack(ResponseInterne({ status: 400, data: {} }))
                                    }
                                })
                            }else{
                                return callBack(ResponseInterne({ status: 244, body: {} }))
                            }
                        }else{
                            return callBack(ResponseInterne({ status: 203, body: {} }))
                        }
                    })
                }else{
                    return callBack(ResponseInterne({ status: 203, body: {} }))
                }
            })
        } catch (error) {
            loggerSystemCrached({ message: JSON.stringify(error), title: "Server crached on login" })
            return callBack(ResponseInterne({ status: 500, body: error }))
        }
    },

    onRegister: async ({ input, callBack }) => {
        if(input && callBack){
            const { phone, password } = input;
            const pwd = await hashPWD({ plaintext: password });
            Checker.checkIfUserExist({ 
                key: 'phone',
                value: phone,
                callBack: ({ rejected, resolved }) => {
                    if(rejected){
                        callBack({ rejected: true, resolved: undefined })
                    }else{
                        const { code } = resolved;
                        if(code === 200){
                            __User.create({
                                phone: fillphone({ phone })
                            })
                            .then(_user => {
                                if(_user instanceof __User){
                                    tokenGenerate({ data: _user && _user['phone'] }, (err, done) => {
                                        if(done){
                                            // __Extrasinfos.create({

                                            // })
                                            __Cridentials.create({
                                                uuiduser: _user && _user['uuid'],
                                                password: pwd,
                                                token: done.toString(),
                                                lastlogin: momentNow()
                                            })
                                            .then(_C => {})
                                            .catch(_E => {})
                                            return callBack(ResponseInterne({ status: 200, body: { ..._user.toJSON(), token: done } }))
                                        }else{
                                            return callBack(ResponseInterne({ status: 400, body: {} }))
                                        }
                                    })
                                }else{
                                    callBack(ResponseInterne({ status: 503, body: _user }))
                                }
                            })
                            .catch(err => {
                                console.log('====================================');
                                console.log(" Catch Seq", err);
                                console.log('====================================');
                                callBack(ResponseInterne({ status: 500, body: err }))
                            })
                        }else{
                            callBack(ResponseInterne({ status: 500, body: "Error occured" }))
                        }
                    }
                }
            })
        }
    }
}