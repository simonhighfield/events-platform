import { gapi } from "gapi-script";

export default async function connectGoogleAccount() {
    try {
        const authInstance = gapi.auth2.getAuthInstance();
        const user = await authInstance.signIn();
        const token = user.getAuthResponse().access_token;

        console.log('Google account connected, token:', token);
        return {token};
    } catch (error) {
        console.error('Error in connectGoogleAccount:', error);
        throw {error};
    }
};
