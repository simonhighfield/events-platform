import fetchSkiddleEvents from "./fetchSkiddleEvents";

export default function fetchAllEvents(skiddleSearchParameters) {

    return Promise.all([fetchSkiddleEvents(skiddleSearchParameters)])
    .then(([{ skiddleEvents }]) => {
        console.log('in Promise.All', skiddleEvents);

        const events = [...skiddleEvents]

        return events
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