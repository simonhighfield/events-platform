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

        return sortedEvents
    })

    // return fetchSkiddleEvents(skiddleSearchParameters)
    // .then((events) => {
    //     if (!events || events.length === 0) {
    //         return Promise.reject(new Error("No events found"));
    //     }
    //     return events;
    // })
    // .catch((error) => {
    //     return Promise.reject(error)
    // })

}