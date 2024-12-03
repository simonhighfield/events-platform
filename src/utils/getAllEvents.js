import fetchSkiddleEvents from "./fetchSkiddleEvents";

export default function getAllEvents() {
    const skiddleParamsForClubEventsInManchester = {
        latitude: 53.4839,
        longitude: -2.446,
        radius: 10,
        limit: 10,
        eventcode: 'CLUB'
    }

    return fetchSkiddleEvents(skiddleParamsForClubEventsInManchester).then((events) => {
        return events
    })
    
}