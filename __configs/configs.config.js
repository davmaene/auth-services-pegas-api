import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const Configs = new Sequelize(
    process.env.APPDBNAME,
    process.env.APPDBUSERNAME,
    process.env.APPDBPASSWORD
    ,{
        port: process.env.APPDBPORT,
        host: process.env.APPDBHOSTNAME,
        dialect: process.env.APPDBDIALECT || "mysql"
    }
);



