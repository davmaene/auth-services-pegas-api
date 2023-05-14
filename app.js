import express from "express";
import dotenv from 'dotenv';
import { Response } from "./__helpers/helper.serverresponse.js";
import { loggerSystemAction, loggerSystemStarted } from "./__helpers/helper.logwriterfile.js";
dotenv.config();

const PORT = process.env.PORT || 4300;
const pegasWEBService = express();

pegasWEBService.use((req, res, next) => {
    loggerSystemAction({
        data: JSON.stringify({
            status: 404,
            ...{
                message: "There is nothing over here",
                url: req && req['url']
            } 
        }),
        title: "Error 404",
        message: "Url passed not found on the server" 
    })
    return Response({ 
        res, 
        status: 404, 
        body: {
            message: "There is nothing over here",
            url: req && req['url']
        } 
    })
})

pegasWEBService.listen(PORT ,() => {
    loggerSystemStarted()
    console.log('====================================');
    console.log("app is running on " + PORT);
    console.log('====================================');
})