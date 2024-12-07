export function convertDateToYYYYMMDD(date) {
    return date.toISOString().split('T')[0];
}
