import Sequelize from 'sequelize';
import { Configs } from '../__configs/configs.config.js';
import dotenv from 'dotenv';
import { momentNow } from '../__helpers/helper.moment.js';
import { momentNowInUnix } from '../__helpers/helper.moment.js';
import { uuid } from '../__helpers/helper.uuid.js';

dotenv.config()

export const __User = Configs.define('__tbl_pegas_users', {
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: uuid
    },
    fsname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    createdoninunix:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: momentNowInUnix()
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
