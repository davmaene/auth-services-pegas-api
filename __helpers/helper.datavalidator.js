import { Response } from "./helper.serverresponse.js";
import Joi from "joi";

export const emailValidator = ({ email, res }) => {
    email = email.trim();
    if((/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/).test(email.toString().toLowerCase())) return true;
    else return Response(res, 405, "The email you entered seems invalid !")
};

export const genderValidator = ({ chaine, res }) => {
    const genders = [
        "masculin",
        "feminin"
    ];
    if(genders.includes(chaine.toLowerCase())) return true;
    else return Response(res, 405, `The gender you entered mus be included in this  ${genders.toString()}`)
};

export const phoneValidator = ({ phone, res }) => {
    if((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).test(phone)) return true;
    else return Response(res, 405, "The phone number you entered seems invalid !")
};

export const dateValidator = ({ chaine, res }) => {
    return true;
    if (Object.prototype.toString.call(chaine) === "[object Date]") {
        // it is a date
        if (isNaN(d)) { // d.getTime() or d.valueOf() will also work
          // date object is not valid
            return Response(res, 405, "The date you entered seems invalid !")
        } else {
          // date object is valid
          return true
        }
      } else {
        // not a date object
        return Response(res, 405, "The date you entered seems invalid !")
    }
    // if(moment(new Date(chaine)).isValid()) return true;
    // else return true //Response(res, 405, "The date you entered seems invalid !")
};

export const nameValidator = ({ name, res }) => {
    name = name.trim();
    if((/^[a-z0-9]+$/).test(name.toString().toLowerCase())) return true;
    else return Response(res, 405, "The name you entered must not contain numeric or special character Ex: David")
};

export const passwordValidator = ({ chaine, res }) => {
    if((/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(chaine)) return true;
    else return Response(res, 405, "The password you entered must have at least (8) eight characters, at least one letter, one number and one special character, ex: D@v123456");
};

export const convertStringIntoArray = ({ chaine }) => {

    let b = chaine.toString();
    b = b.replace("[", "");
    b = b.replace("]", "");
    b = b.replace(/\"/g, "");
    b = b.split(",");
    
    return b;

};

export const UserSchemaValidator = ({object, cb}) => {
    const User = Joi.object({
        phone: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
    })

    cb(User.validate({ ...object }))
}