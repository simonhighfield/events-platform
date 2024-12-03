import axios from "axios";
const skiddleApiKey = import.meta.env.VITE_SKIDDLE_KEY

export default function fetchSkiddleEvents () {
    console.log('fetching skiddle events with: ', skiddleApiKey);
}