import { gapi } from "gapi-script";

const apiKey = import.meta.env.VITE_GOOGLE_CAL_API_KEY;
const client_id = import.meta.env.VITE_GOOGLE_CAL_CLIENT_ID;    // Authorisation credentials for web application
const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];  // For APIs used by the quickstart
const scope = 'https://www.googleapis.com/auth/calendar.readonly'; // Authorization scopes

export default function initialiseGoogleApiClient() {
    
    (function loadApiJsClientLibrary() {
        gapi.load('client:auth2', initialiseApiJsClientLibrary);
    })()

    function initialiseApiJsClientLibrary() {
        gapi.client.init({
            apiKey,
            client_id,
            discoveryDocs,
            scope
        });
    }
}