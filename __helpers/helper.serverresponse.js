import { conoleToSlackService } from "../__services/service.slackwebhook.js";

export const Response = ({ res, status, body }) => {
    if(1 && res && status){
        const sts = parseInt(status);
        let text = "";
        switch(sts){
            
            case 200:
            text = "Success execution"
            res.status(200).json({
                status: 200,
                message: "Success execution",
                data: body ? body : {}
            });
            break;

            case 402:
            res.status(402).json({
                status: 402,
                message: "Account not activate !",
                data: body ? body : {}
            });
            break;

            case 203:
            res.status(203).json({
                status: 203,
                message: "Login failed `password` or `username` is incorrect !",
                data: body ? body : {}
            });
            break;

            case 246:
            res.status(246).json({
                status: 246,
                message: "Verification faild failed `code` or `uuid` is incorrect !",
                data: body ? body : {}
            });
            break;

            case 244:
            res.status(244).json({
                status: 244,
                message: "Login failed cause account is not activate",
                data: body ? body : {}
            });
            break;

            case 245:
                res.status(245).json({
                    status: 245,
                    message: "Account already activated !",
                    data: body ? body : {}
                });
                break;

            case 404:
            res.status(404).json({
                status: 404,
                message: "Ressource not found on this server !",
                data: body ? body : {}
            });
            break;

            case 403: 
            res.status(403).json({
                status: 403,
                message: "You don't have right access to this server ! please check your app and access key",
                data: body ? body : {}
            })
            break;

            case 400: 
            res.status(400).json({
                status: 400,
                message: "Success execution but nothing to render",
                data: body ? body : {}
            })
            break;

            case 401:
            res.status(401).json({
                status: 401,
                message: "missing params to the request !",
                data: body ? body : {}
            });
            break;

            case 402:
            res.status(402).json({
                status: 402,
                message: "Session has expired !",
                data: body ? body : {}
            });
            break;

            case 503: 
            res.status(503).json({
                status: 503,
                message: "SQL Error in executing request !",
                data: body ? body : {}
            })
            break;

            case 203: 
            res.status(203).json({
                status: 203,
                message: "No enougth cash for payement !",
                data: body ? body : {}
            })
            break;

            case 500: 
            res.status(500).json({
                status: 500,
                message: "An internal server error occured !",
                data: body ? body : {}
            })
            break;
            
            default: 
            res.status(222).json({
                status: 222,
                message: "unknown internal server occured on this server | please contact + 243 970 284 772 if the problem persists",
                data: []
            })
            break;
        }

        conoleToSlackService({ 
            text: JSON.stringify(body), 
            callBack: ({error, done}) => {

            } 
        });
    }else{
        res.status(222).json({
            status: 222,
            message: "missing params to the request ",
            data: "case where missing `res` or `status` object in switch case"
        });
    }
};