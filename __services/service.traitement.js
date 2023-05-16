import { ResponseInterne } from "../__helpers/helper.serverinterneresponse.js";
import { __User } from "../__models/model.user.js"
import { Op } from "sequelize";
import { tokenGenerate } from "../__ware/ware.session.js";
import { comparePWD } from "../__helpers/helper.password.js";
import { fillphone } from "../__helpers/helper.fillphonenumber.js";
import { loggerSystemCrached } from "../__helpers/helper.logwriterfile.js";

export const Service = {
    onLogin: async ({input, callBack}) => {
        const { username, password } = input;
        try {
            __User.findOne({
                where: {
                    [Op.or]: [
                        { phone: fillphone({ phone: username }) },
                        { email: username.toString().toLowerCase() }
                    ]
                }
            })
            .then(_user => {
                if(_user instanceof __User){
                    comparePWD({ plaintext: password, hashedtext: _user && _user['password'] }, (err, done) => {
                        if(done){
                            const { verified } = _user.toJSON();
                            if(verified === 1){
                                tokenGenerate({ data: _user && _user['email'] }, (err, done) => {
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

    onRegister: async (input) => {

    }
}