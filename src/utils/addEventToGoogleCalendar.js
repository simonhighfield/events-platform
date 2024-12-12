export const addEventToGoogleCalendar = async (event, googleToken) => {
    const { admin_id, event_name, event_date, location, event_photo_url, contributors, description, additional_data } = event
        
    try {
        await gapi.client.load('calendar', 'v3');

        gapi.client.setToken({ access_token: googleToken });

        const calendarEvent = {
            summary: 'Test',
            location: 'Manchester',
            description: 'The coolest party.',
            start: {
                dateTime: '2024-12-12T10:00:00-07:00', // Ensure ISO 8601 format
                timeZone: 'Europe/London',
            },
            end: {
                dateTime: '2024-12-12T11:00:00-07:00',
                timeZone: 'Europe/London',
            },
        };
    
        const response = await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: calendarEvent,
        });

        console.log('Event added:', response);
        return response;
    } catch (error) {
        console.error('Error adding event to Google Calendar:', error);
        throw error;
    }
};
