import { UserSchemaValidator } from "../__helpers/helper.datavalidator.js"
import { Response } from "../__helpers/helper.serverresponse.js"

export const controllerUser = {
    onSignin: async (req, res, next) => {
        const { username, password } = req.body;
        UserSchemaValidator({ object: { ...req.body }, cb: ({ value, error }) => {
                if(error){
                    return Response({ res, status: 401, body: "This request must have at least username and password " })
                }else{
                    
                }
            } 
        })
        return Response({ res, status: 200, body: {} })
    },

    onSignup: async (req, res, next) => {

    }
}