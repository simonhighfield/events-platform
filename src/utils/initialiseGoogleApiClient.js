import { gapi } from "gapi-script";

const API_KEY = import.meta.env.VITE_GOOGLE_CAL_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CAL_CLIENT_ID;    // Authorisation credentials for web application
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];  // Discovery doc URL for APIs used by the quickstart
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'; // Authorization scopes

export default function initialiseGoogleApiClient() {
    
    (function loadApiJsClientLibrary() {
        gapi.load('client:auth2', initialiseApiJsClientLibrary);
    })()

    function initialiseApiJsClientLibrary() {
        gapi.client.init({
            apiKey: API_KEY,
            client_id: CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: SCOPES,
        });
    }
}