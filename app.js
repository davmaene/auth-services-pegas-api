import express from "express";
import dotenv from 'dotenv';
import { Response } from "./__helpers/helper.serverresponse.js";
import { loggerSystemAction, loggerSystemCrached, loggerSystemStarted } from "./__helpers/helper.logwriterfile.js";
import { __routes } from "./__routes/index.js";
import cors from 'cors';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { Configs } from "./__configs/configs.config.js";

dotenv.config();

const PORT = process.env.PORT || 4300;
const pegasWEBService = express();

pegasWEBService.use(cors())
pegasWEBService.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 }}));
pegasWEBService.use(express.json({ limit: '50mb' }));
pegasWEBService.use(cookieParser(process.env.APPCOOKIESNAME));
pegasWEBService.use(express.urlencoded({ extended: true, limit: '50mb' }));

pegasWEBService.use("/api", __routes);

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
    Configs.authenticate()
    .then(C => {
        loggerSystemAction({
            message: "Connexion to success",
            data: JSON.stringify({}),
            title: "Connexion to DB done"
        })
    })
    .catch(err => {
        loggerSystemCrached({ 
            message: err.toString(),
            title: "Error connexion to DB"
        })
        console.log("Error Connexion to DB ", `===> Sorry we occured an error when trying to connect '${process.env.APPDBNAME}'`);
        console.log(err);
    })
})