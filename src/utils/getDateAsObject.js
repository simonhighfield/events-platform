export function getDateAsObject(YYYYMMDD = '2024-12-25', HHMM = '00:00') {
    const dateAsIsoString = YYYYMMDD + 'T' + HHMM + ':00';
    return new Date(dateAsIsoString);
}