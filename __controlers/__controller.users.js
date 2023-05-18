import { UserSchemaValidator } from "../__helpers/helper.datavalidator.js"
import { Response } from "../__helpers/helper.serverresponse.js"
import { Service } from "../__services/service.traitement.js";

export const controllerUser = {
    onSignin: async (req, res, next) => {
        const { username, password } = req.body;
        UserSchemaValidator({ object: { ...req.body }, cb: ({ value, error }) => {
                if(error){
                    return Response({ res, status: 401, body: "This request must have at least username and password " })
                }else{
                    Service.onLogin({ 
                        input: { username, password }, 
                        callBack: (output) => Response({ res, ...output })
                    })
                }
            } 
        })
    },

    onSignup: async (req, res, next) => {
        const { phone, email } = req.body;
        Service.onRegister({
            input: { phone },
            callBack: (output) => {
                console.log("Output is ==> ", output);
            }
        })
    }
}