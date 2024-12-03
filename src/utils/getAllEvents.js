import fetchSkiddleEvents from "./fetchSkiddleEvents";

export default function getAllEvents() {
    const skiddleParamsForClubEventsInManchester = {
        latitude: 53.4839,
        longitude: -2.446,
        radius: 10,
        limit: 100,
        eventcode: 'CLUB'
    }

    return fetchSkiddleEvents(skiddleParamsForClubEventsInManchester)
    .then((events) => {
        if (!events || events.length === 0) {
            return Promise.reject(new Error("No events found"));
        }
        return events;
    })
    .catch((error) => {
        return Promise.reject(error)
    })

}