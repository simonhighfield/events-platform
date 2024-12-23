import axios from "axios";
import formatSkiddleError from "./formatSkiddleError";

export default function fetchSkiddleEvents ({ latitude, longitude, radius, limit, eventcode }) {
    const skiddleApiKey = import.meta.env.VITE_SKIDDLE_KEY
    
    return axios.get(`https://www.skiddle.com/api/v1/events/search/?api_key=${skiddleApiKey}/&`,
        { params: {
                latitude,
                longitude,
                radius,
                eventcode,
                limit,
                description: true
            },
        }
    )
    .then(({ data }) => {
        return {skiddleEvents: data.results}
    })
    .catch((error) => {        
        console.error('error fetching Skiddle events: ' + error.response.data.errormessage)
        throw formatSkiddleError(error.response.data)
    });
}