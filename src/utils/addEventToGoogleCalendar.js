export const addEventToGoogleCalendar = async (event, googleToken) => {
    const { event_name, event_date, event_end_date, location, description } = event
        
    try {
        await gapi.client.load('calendar', 'v3');

        // Temporary Code, as I need to add end_date to my tables, and structure
        const temp_end_date = new Date(event_date)
        if (!event_end_date) {
            temp_end_date.setDate(temp_end_date.getDate() + 1);
            console.log(event_date, event_end_date, temp_end_date);
        }

        const calendarEvent = {
            summary: event_name,
            location: location,
            description,
            start: {
                dateTime: event_date.toISOString(),
                timeZone: 'Europe/London',
            },
            end: {
                dateTime: event_end_date ? event_end_date.toISOString() : temp_end_date.toISOString(),
                timeZone: 'Europe/London',
            },
        };
    
        const eventAdded = await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: calendarEvent,
        });

        return {eventAdded};
    } 
    catch (error) {
        console.error('Error adding event to Google Calendar:', error);
        throw error;
    }
};
