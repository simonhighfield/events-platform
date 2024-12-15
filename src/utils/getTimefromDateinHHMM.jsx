export function getTimefromDateinHHMM(inputDate) {

    const date = new Date(inputDate);
    const dateAsString = date.toISOString();

    return dateAsString.split('T')[1].slice(0, 5);
}
