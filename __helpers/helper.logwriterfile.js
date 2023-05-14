const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config()

const loggerSync = ({ message, raison, model }) => {
    const fl = fs.createWriteStream('assets/assetsLOGS/log.chash.server.ini', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    fl.write(`\n Model => ${model}\n Record => ${message}\n Raison => ${raison}\n Temps => ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    fl.write(`\n--------------------------------------------------------------------`);
    fl.close()
};

const loggerSystem = ({ message, title }) => {
    const fl = fs.createWriteStream('assets/assetsFICHES/log.system.infos.ini', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })
    fl.write(`\n Title => ${title}\n Info => ${message}\n Temps => ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    fl.write(`\n--------------------------------------------------------------------`);
    fl.close()
};

module.exports = {
    loggerSync,
    loggerSystem
};