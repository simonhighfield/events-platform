import axios from "axios";

export default function fetchSkiddleEventById (id) {
    const skiddleApiKey = import.meta.env.VITE_SKIDDLE_KEY

    console.log('fetching SkiddleEventsById with Id: ', id);
    
    
    // return axios.get(`https://www.skiddle.com/api/v1/events/search/?api_key=${skiddleApiKey}/&`,
    //     { params: {
    //             latitude,
    //             longitude,
    //             radius,
    //             eventcode,
    //             limit,
    //             description: true
    //         },
    //     }
    // )
    // .then(({ data }) => {
    //     const skiddleEvents = data.results
    //     return { skiddleEvents }
    // })
    // .catch((error) => {
    //     return Promise.reject(error)
    // });
}