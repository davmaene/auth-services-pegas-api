import Sequelize from 'sequelize';
import { Configs } from '../__configs/configs.config.js';
import dotenv from 'dotenv';
import { momentNow } from '../__helpers/helper.moment.js';
import { momentNowInUnix } from '../__helpers/helper.moment.js';
import { nullUuid } from '../__helpers/helper.uuid.js';

dotenv.config()

export const __Extrasinfos = Configs.define('__tbl_pegas_extrasinfos', {
    uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    uuiduser: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: nullUuid
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    countrycode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    stateprovince: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
    },
    city: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: process.env.APPESCAPESTRING
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
