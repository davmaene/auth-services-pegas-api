import express from "express";
import dotenv from 'dotenv';
import { Response } from "./__helpers/helper.serverresponse.js";
dotenv.config();

const PORT = process.env.PORT || 4300;
const pegasWEBService = express();

pegasWEBService.use((req, res, next) => {
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
    console.log('====================================');
    console.log("app is running on " + PORT);
    console.log('====================================');
})