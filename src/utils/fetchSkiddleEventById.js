import axios from "axios";

export default function fetchSkiddleEventById (id) {
    const skiddleApiKey = import.meta.env.VITE_SKIDDLE_KEY
    
    return axios.get(`https://www.skiddle.com/api/v1/events/${id}/?api_key=${skiddleApiKey}/&`,{})
    .then(({ data }) => {
        return {event: data.results}
    })
    .catch((error) => {
        console.error('error fetching Skiddle event by ID: ', error.response.data.errormessage)
        throw {error}
    });
}