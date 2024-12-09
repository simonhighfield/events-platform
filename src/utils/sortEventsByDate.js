export function sortEventsByDate(events) {

    function compareEventsByDate(eventA, eventB) {
        const dateA = new Date(eventA.event_date);
        const dateB = new Date(eventB.event_date);
        return dateA - dateB;
    }

    return events.sort(compareEventsByDate);
}
