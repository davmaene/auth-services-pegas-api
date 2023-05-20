import { __User } from "../__models/model.user.js"

export const Checker = {
    checkIfUserExist: ({ key, value, callBack }) => {
        try {
            __User.findOne({
                where: {
                    [key]: value
                }
            })
            .then(user_ => {
                if(user_ instanceof __User){
                    callBack({ rejected: undefined, resolved: { code: 400, message:  "This user still exist in this server ", data: user_} })
                }else{
                    callBack({ rejected: undefined, resolved: { code: 200, message: "This user was not found on this server", data: {} } })
                }
            })
            .catch(err => {
                callBack({ rejected: err, resolved: undefined })
            })
        } catch (error) {
            callBack({ rejected: error, resolved: undefined })
        }
    }
}