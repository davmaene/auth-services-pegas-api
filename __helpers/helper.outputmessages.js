import dotenv from 'dotenv';
dotenv.config()

export const contentMessages = {
    singin: {
        options: {},
        lg: "fr",
        content: `Bienvenu sur ${process.env.APPNAME}`
    },
    signup: {
        options: {},
        lg: "fr",
        content: `Bienvenu sur ${process.env.APPNAME}`
    }
}