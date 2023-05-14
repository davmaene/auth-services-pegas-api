const randomstring = require("randomstring");
const dotenv = require('dotenv');
const generator = require('generate-password');

dotenv.config();

const generateIdentifier = ({ prefix }) => {
    const pfx = Math.floor(Math.random() * 1000);
    const sfx = Math.floor(Math.random() * 100);
    
    return `${prefix ? prefix : "REF"}-${pfx}-${sfx}`;
};

const generateSecuredPassword = ({ length }) => {
    var password = generator.generate({
        length,
        numbers: true,
        symbols: false,
        excludeSimilarCharacters: true,
        uppercase: true
    });

    return password
};

const generateFilename = ({ prefix, tempname }) => {
    const extension = tempname.substring(tempname.lastIndexOf("."));
    return `${prefix ? prefix : ""}${randomstring.generate()}${extension}`;
};

const randomLongNumber = ({ length }) => {
    const len = length && !isNaN(parseInt(length)) ? length : 6;
    const ret = [];

    for(let k = 0; k < len; k++) ret.push(
       Math.floor( Math.random() * 10 )
    );
    
    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return m.trim();
};

const returnDayOfTheWeekFromNumber = ({ dayNumber }) => {
    switch (parseInt(dayNumber)) {
        case 0:
            return "Lundi";
            break;
        case 1:
            return "Mardi";
            break;
        case 2:
            return "Mercredi";
            break;
        case 3:
            return "Jeudi";
            break;
        case 4:
            return "Vendredi";
            break;
        case 5:
            return "Samedi";
            break;
        case 6:
            return "Dimanche";
            break;
        default:
            return "Not specific";
            break;
    }
};

module.exports = {
    returnDayOfTheWeekFromNumber,
    randomLongNumber,
    generateSecuredPassword,
    generateFilename,
    generateIdentifier
}