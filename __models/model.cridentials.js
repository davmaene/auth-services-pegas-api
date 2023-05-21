import Sequelize from 'sequelize';
import { Configs } from '../__configs/configs.config.js';
import dotenv from 'dotenv';
import { momentNow } from '../__helpers/helper.moment.js';
import { momentNowInUnix } from '../__helpers/helper.moment.js';
import { nullUuid, uuid } from '../__helpers/helper.uuid.js';

dotenv.config()

export const __Cridentials = Configs.define('__tbl_pegas_cridentials', {
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: uuid
    },
    uuiduser: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: nullUuid
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    code: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    lastlogin: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    verified: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    updatedon: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    createdon: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: momentNow()
    }
}, {
    timestamps: false,
    freezeTableName: true
});
