import { gapi } from "gapi-script";

// Authorisation credentials for web application
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CAL_CLIENT_ID;

// API Key
const API_KEY = import.meta.env.VITE_GOOGLE_CAL_API_KEY;

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

export default async function initialiseGoogleApiClient() {
    console.log(CLIENT_ID, API_KEY, DISCOVERY_DOC);
}