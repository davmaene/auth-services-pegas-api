import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { APPDBNAME, APPDBUSERNAME, APPDBPASSWORD, APPDBPORT, APPDBHOSTNAME, APPDBDIALECT } = process.env;

export const Configs = new Sequelize(
    APPDBNAME,
    APPDBUSERNAME,
    APPDBPASSWORD
    ,{
        port: APPDBPORT,
        host: APPDBHOSTNAME,
        dialect: APPDBDIALECT || "mysql"
    }
);



