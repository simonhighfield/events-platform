import fetchAdminEvents from "./fetchAdminEvents";
import fetchSkiddleEvents from "./fetchSkiddleEvents";
import { formatSkiddleEvents } from "./formatSkiddleEvents";
import { sortEventsByDate } from "./sortEventsByDate";

export default function fetchAndSortAllEvents(skiddleSearchParameters) {

    return Promise.all([
        fetchSkiddleEvents(skiddleSearchParameters),
        fetchAdminEvents()
    ])
    .then(([{ skiddleEvents }, { adminEvents}]) => {


        // const events = []
        // if (skiddleEvents && skiddleEvents.length > 0) {
        //     events = [...formatSkiddleEvents(skiddleEvents)]
        // }
        // if (adminEVents && adminEvents.length > 0) {
        //     events = [...events,...adminEvents]
        // }
        const events = [...formatSkiddleEvents(skiddleEvents),...adminEvents]

        const sortedEvents = sortEventsByDate(events)

        return {events: sortedEvents}
    })
    .catch((error) => {
        throw error
    })
}