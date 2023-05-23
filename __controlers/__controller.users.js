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
        const { phone, password, email } = req.body;
        if(!phone || !password) return Response({ res, status: 401, body: "This request must have at leats phone number or email !" })
        Service.onRegister({
            input: { phone, password },
            callBack: (output) => Response({ res, ...output })
        })
    },

    onVerify: async (req, res, next) => {
        const { code, uuid } = req.body;
        if(!code || !uuid) return Response({ res, status: 401, body: "This request must have at least code and uuid" })
        Service.onVerify({
            input: { code, uuid },
            callBack: (output) => Response({ res, ...output })
        })
    },

    onFillProfile: async (req, res, next) => {
        const {
            uuid,
            fsname,
            lsname,
            email,
            country,
            countrycode,
            stateprovince,
            city
        } = req.body;

        if(!uuid)  return Response({ res, status: 401, body: "This request must have at least uuid !" });
        else{
            try {
                return Response({ res, status: 200, body: req.body })
            } catch (error) {
                return Response({ res, status: 500, body: error })
            }
        }
    }
}