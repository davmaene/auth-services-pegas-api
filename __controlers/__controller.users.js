import { UserSchemaValidator } from "../__helpers/helper.datavalidator.js"
import { Response } from "../__helpers/helper.serverresponse.js"
import { Service } from "../__services/service.traitement.js";

export const controllerUser = {
    
    onSignin: async (req, res, next) => {
        const { phone, password } = req.body;
        UserSchemaValidator({ object: { ...req.body }, cb: ({ value, error }) => {
                if(error){
                    return Response({ res, status: 401, body: "This request must have at least username and password !" })
                }else{
                    Service.onLogin({ 
                        input: { phone, password }, 
                        callBack: (output) => Response({ res, ...output })
                    })
                }
            } 
        })
    },

    onSignup: async (req, res, next) => {
        const { phone, email } = req.body;
        if(!phone) return Response({ res, status: 401, body: "This request must have at leats phone number or email !" })
        Service.onRegister({
            input: { phone },
            callBack: (output) => {
                return Response({ res, ...output })
            }
        })
    }
}