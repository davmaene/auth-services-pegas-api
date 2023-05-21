import moment from "moment";
moment.locale("fr");
moment().startOf("day");

export const momentNow = () => moment().format("L");
export const now = () => moment().format("L, LTS");
export const momentNowInUnix = () => moment().unix();