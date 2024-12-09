import fetchAdminEvents from "./fetchAdminEvents";
import fetchSkiddleEvents from "./fetchSkiddleEvents";
import { formatSkiddleEvents } from "./formatSkiddleEvents";
import { sortEventsByDate } from "./sortEventsByDate";

export default function fetchAllEvents(skiddleSearchParameters) {

    return Promise.all([
        fetchSkiddleEvents(skiddleSearchParameters),
        fetchAdminEvents()
    ])
    .then(([{ skiddleEvents }, { adminEvents}]) => {
        console.log('in Promise.All skiddle events', skiddleEvents);
        console.log('in Promise.All formatted skiddle events', formatSkiddleEvents(skiddleEvents));
        console.log('in Promise.All admin events', adminEvents);
        
        const events = [...formatSkiddleEvents(skiddleEvents),...adminEvents]

        const sortedEvents = sortEventsByDate(events)

        return {events: sortedEvents}
    })
    .catch((error) => {
        throw error
    })
}