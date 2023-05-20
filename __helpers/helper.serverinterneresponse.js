export const ResponseInterne = ({ status, body }) => {
    if(1 && status){
        const sts = parseInt(status);
        switch(sts){
            
            case 200:
            return({
                status: 200,
                message: "Success execution",
                body: body ? body : {}
            });
            break;

            case 402:
            return({
                status: 402,
                message: "Account not activate !",
                body: body ? body : {}
            });
            break;

            case 203:
            return({
                status: 203,
                message: "Login failed `password` or `username` is incorrect !",
                body: body ? body : {}
            });
            break;

            case 244:
            return({
                status: 244,
                message: "Login failed cause account is not activate",
                body: body ? body : {}
            });
            break;

            case 404:
            return({
                status: 404,
                message: "Ressource not found on this server !",
                body: body ? body : {}
            });
            break;

            case 403: 
            return({
                status: 403,
                message: "You don't have right access to this server ! please check your app and access key",
                body: body ? body : {}
            })
            break;

            case 400: 
            return({
                status: 400,
                message: "Success execution but nothing to render",
                body: body ? body : {}
            })
            break;

            case 401:
            return({
                status: 401,
                message: "missing params to the request !",
                body: body ? body : {}
            });
            break;

            case 402:
            return({
                status: 402,
                message: "Session has expired !",
                body: body ? body : {}
            });
            break;

            case 503: 
            return({
                status: 503,
                message: "SQL Error in executing request !",
                body: body ? body : {}
            })
            break;

            case 203: 
            return({
                status: 203,
                message: "No enougth cash for payement !",
                body: body ? body : {}
            })
            break;

            case 500: 
            return({
                status: 500,
                message: "An internal server error occured !",
                body: body ? body : {}
            })
            break;
            
            default: 
            return({
                status: 222,
                message: "unknown internal server occured on this server | please contact + 243 970 284 772 if the problem persists",
                body: []
            })
            break;
        }
    }else{
        return({
            status: 222,
            message: "missing params to the request ",
            body: "case where missing `res` or `status` object in switch case"
        });
    }
};