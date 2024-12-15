export const addEventToGoogleCalendar = async (event, googleToken) => {
    const { event_name, event_date, event_end_date, location, description } = event
        
    console.log(event);
    

    try {
        await gapi.client.load('calendar', 'v3');

        const event_date_object = new Date (event_date)
        
        let event_end_date_object = new Date (event_date)
        // Temporary Code, as I need to add end_date to my tables, and structure        
        if (event_end_date) {
            event_end_date_object = new Date (event_end_date)
        } else {
            event_end_date_object.setDate(event_end_date_object.getDate() + 1);
        }
        // console.log('event date: ', event_date, event_date_object, 'ending: ', event_end_date, event_end_date_object);
        
        const calendarEvent = {
            summary: event_name,
            location: location,
            description,
            start: {
                dateTime: event_date_object.toISOString(),
                timeZone: 'Europe/London',
            },
            end: {
                dateTime: event_end_date_object.toISOString(),
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
