import fs from 'fs';
import dotenv from 'dotenv';
import { momentNow } from './helper.moment.js';

dotenv.config()

export const loggerSystemAction = ({ message, title, data }) => {
    const fl = fs.createWriteStream('__assets/__log/log.system.annyaction.ini', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    fl.write(`\nTitle => ${title}\nMessage => ${message}\nData => ${data}\nDate => ${momentNow()}`);
    fl.write(`\n--------------------------------------------------------------------`);
    fl.close()
};

export const loggerSystemCrached = ({ message, title }) => {
    const fl = fs.createWriteStream('__assets/__log/log.system.crached.ini', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    fl.write(`\nTitle => ${title}\n Info => ${message}\n Date => ${momentNow()}`);
    fl.write(`\n--------------------------------------------------------------------`);
    fl.close()
};

export const loggerSystemStarted = () => {
    const fl = fs.createWriteStream('__assets/__log/log.system.started.ini', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    fl.write(`\nTitle => System Started\n Info => The System was successfuly started\n Date => ${momentNow()}`);
    fl.write(`\n--------------------------------------------------------------------`);
    fl.close()
};
