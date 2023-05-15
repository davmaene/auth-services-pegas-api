import { ResponseInterne } from "../__helpers/helper.serverinterneresponse.js";
import { __User } from "../__models/model.user"
import { Op } from "sequelize";
import { tokenGenerate } from "../__ware/ware.session.js";

export const Service = {
    onLogin: async ({input, callBack}) => {
        const { username, password } = input;
        __User.findOne({
            where: {
                [Op.or]: [
                    { phone: fil({ phone: email }) },
                    { email: email.toString().toLowerCase() }
                ]
            }
        })
        .then(_user => {
            if(_user instanceof __User){
                tokenGenerate({ data: _user && _user['email'] }, (err, done) => {
                    if(done){
                        
                    }else{
                        return callBack(ResponseInterne({ status: 400, data: {} }))
                    }
                })
            }else{
                return callBack(ResponseInterne({ status: 203, body: {} }))
            }
        })
    },
    onRegister: async (input) => {

    }
}