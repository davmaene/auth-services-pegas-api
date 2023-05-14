import { Response } from "../__helpers/helper.serverresponse.js"

export const controllerUser = {
    onSignin: async (req, res, next) => {
        return Response({ res, status: 200, body: {} })
    },
    
    onSignup: async (req, res, next) => {

    }
}