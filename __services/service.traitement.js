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
import { momentNow, now } from "../__helpers/helper.moment.js";
import { randomLongNumber } from "../__helpers/helper.random.js";
import { Configs } from "../__configs/configs.config.js";
import { SMS } from "./service.sms.js";
import { contentMessages } from "../__helpers/helper.outputmessages.js";
import { conoleToSlackService } from "./service.slackwebhook.js";

export const Service = {

    onLogin: async ({ input, callBack }) => {
        const { phone, password } = input;
        conoleToSlackService({ callBack: ({error, done}) => {} })

        try {

            __User.hasOne(__Cridentials, { foreignKey: "uuiduser" });
            __Cridentials.belongsTo(__User,  {
                foreignKey: {
                    name: 'uuiduser',
                }
            });

            __User.findOne({
                where: {
                    status: 1,
                    [Op.or]: [
                        { phone: fillphone({ phone }) },
                        { email: phone.toString().toLowerCase() }
                    ]
                },
                include: [
                    {
                        model: __Cridentials,
                        required: true,
                        where: {
                            status: 1
                        }
                    }
                ]
            })
            .then(_user => {
                if(_user instanceof __User){

                    _user = _user.toJSON();
                    const _cridentials = _user && _user['__tbl_pegas_cridential'];
                    const { verified } = _cridentials;

                    comparePWD({ 
                        plaintext: password, 
                        hashedtext: ( _cridentials && _cridentials['password'] ) ?? (process.env.APPESCAPESTRING) 
                    }, (err, done) => {
                        if(done){
                            if(parseInt(verified) === 1){
                                tokenGenerate({ data: _user && _user['phone'] }, (err, done) => {
                                    if(done){
                                        delete _user['__tbl_pegas_cridential'];
                                        __Cridentials.update(
                                            {
                                                verified: 1,
                                                lastlogin: now()
                                            },
                                            {
                                                where: {
                                                    uuiduser: _user['uuid']
                                                }
                                            }
                                        )
                                        .then(_V => {
                                            delete _user['__tbl_pegas_cridential'];
                                            return callBack(ResponseInterne({ status: 200, body: { token: done, ..._user } }))
                                        })
                                        .catch(E => {
                                            loggerSystemCrached({ message: JSON.stringify(E), title: "Server crached on verify account" })
                                            return callBack(ResponseInterne({ status: 400, body: {} })); 
                                        })
                                    }else{
                                        return callBack(ResponseInterne({ status: 400, body: {} }))
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
                callBack: async ({ rejected, resolved }) => {
                    if(rejected){
                        callBack({ rejected: true, resolved: undefined })
                    }else{
                        const { code } = resolved;
                        const t = await Configs.transaction()
                        if(code === 200){
                            await __User.create({
                                phone: fillphone({ phone })
                            },{ transaction: t })
                            .then(_user => {
                                if(_user instanceof __User){
                                    const code = randomLongNumber({ length: 6 });
                                    tokenGenerate({ data: _user && _user['phone'] }, (err, done) => {
                                        if(done){

                                            // __Extrasinfos.create({

                                            // })

                                            __Cridentials.create({
                                                uuiduser: _user && _user['uuid'],
                                                password: pwd,
                                                code,
                                                token: done.toString(),
                                                lastlogin: now()
                                            }, { transaction: t })
                                            .then(_C => {
                                                if(_C instanceof __Cridentials){
                                                    const {content } = contentMessages['signup'];
                                                    SMS.onSendSMS({ to: fillphone({ phone }), content: `${content} votre code vérification est ${code}`, cb: (err, done) => { }})
                                                    t.commit()
                                                    return callBack(ResponseInterne({ status: 200, body: { ..._user.toJSON(), token: done } }))
                                                }else{
                                                    t.rollback()
                                                    return callBack(ResponseInterne({ status: 400, body: {} }))
                                                }
                                            })
                                            .catch(_E => {
                                                t.rollback()
                                                return callBack(ResponseInterne({ status: 400, body: {} }))
                                            })

                                        }else{
                                            t.rollback()
                                            return callBack(ResponseInterne({ status: 400, body: {} }))
                                        }
                                    })
                                }else{
                                    t.rollback()
                                    return callBack(ResponseInterne({ status: 503, body: _user }))
                                }
                            })
                            .catch(err => {
                                t.rollback()
                                return callBack(ResponseInterne({ status: 500, body: err }))
                            })
                        }else{
                            return callBack(ResponseInterne({ status: code, body: "Error occured" }))
                        }
                    }
                }
            })
        }
    },

    onVerify: async ({ input, callBack }) => {
        const { uuid, code } = input;
        try {

            __User.hasOne(__Cridentials, { foreignKey: "uuiduser" });
            __Cridentials.belongsTo(__User,  {
                foreignKey: {
                    name: 'uuiduser'
                }
            });

            __User.findOne({
                where: {                   uuid,
                    status: 1,
                },
                include: [
                    {
                        model: __Cridentials,
                        required: true,
                        where: {
                            status: 1
                        }
                    }
                ]
            })
            .then(_user => {
                if(_user instanceof __User){

                    const user = _user.toJSON();
                    const _cridentials = user && user['__tbl_pegas_cridential'];
                    const { verified } = _cridentials;
                    const codeStore = _cridentials['code'];

                    if(verified === 1) return callBack(ResponseInterne({ status: 245, body: {} }));
                    else{

                        if(code.toString() === codeStore.toString()){
                            __Cridentials.update(
                                {
                                    verified: 1,
                                    lastlogin: now()
                                },
                                {
                                    where: {
                                        uuiduser: uuid
                                    }
                                }
                            )
                            .then(_V => {
                                delete user['__tbl_pegas_cridential'];
                                return callBack(ResponseInterne({ status: 200, body: user }))
                            })
                            .catch(E => {
                                loggerSystemCrached({ message: JSON.stringify(E), title: "Server crached on verify account" })
                                return callBack(ResponseInterne({ status: 400, body: {} })); 
                            })
                        }else{
                            return callBack(ResponseInterne({ status: 246, body: {} }))
                        }
                    }
                }else{
                    return callBack(ResponseInterne({ status: 203, body: {} })); 
                }
            })
            .catch(err => {
                console.log(err);
                loggerSystemCrached({ message: JSON.stringify(err), title: "Server crached on verify account" })
                return callBack(ResponseInterne({ status: 503, body: err }))
            })
        } catch (error) {
            loggerSystemCrached({ message: JSON.stringify(error), title: "Server crached on verify account" })
            return callBack(ResponseInterne({ status: 500, body: error }))
        }
    }
}