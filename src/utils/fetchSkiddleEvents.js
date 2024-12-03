import axios from "axios";

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
        const events = data.results
        return events
    })
    .catch((error) => {
        return Promise.reject(error)
    });
}