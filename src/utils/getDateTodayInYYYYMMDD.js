import { convertDateToYYYYMMDD } from "./convertDateToYYYYMMDD";

export function getDateTodayInYYYYMMDD() {
    const todaysDate = new Date();

    return convertDateToYYYYMMDD(todaysDate);
}
