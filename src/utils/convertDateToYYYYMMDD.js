export function convertDateToYYYYMMDD(date) {
    
    return new Date (date).toISOString().split('T')[0];
}
