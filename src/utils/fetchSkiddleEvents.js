import axios from "axios";

export default function fetchSkiddleEvents () {
    const skiddleApiKey = import.meta.env.VITE_SKIDDLE_KEY
    const latitude = 53.4839
    const longitude = -2.446
    const radius = 10
    const limit = 10
    const eventcode = 'CLUB';


    return axios.get(`https://www.skiddle.com/api/v1/events/search/?api_key=${skiddleApiKey}/&`,
        { params: {
                latitude,
                longitude,
                radius,
                eventcode,
                limit,
                description:true
            },
        }
    )
    .then(({ data }) => {
        console.log(data);
        // return data.results;
    });
}