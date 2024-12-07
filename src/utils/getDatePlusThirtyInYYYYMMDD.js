import { convertDateToYYYYMMDD } from "./convertDateToYYYYMMDD";

export function getDatePlusThirtyInYYYYMMDD(inputDate) {

    const date = inputDate ? new Date(inputDate) : new Date ();
    
    date.setDate(date.getDate() + 30);

    return convertDateToYYYYMMDD(date);
}
