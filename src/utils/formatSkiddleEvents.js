export function formatSkiddleEvents(skiddleEvents) {
    return skiddleEvents.map(event => {
        return {
            skiddle_event_id: event.id,
            created_at: null,
            event_name: event.eventname,
            event_date: event.startdate,
            location: event.venue.name,
            event_photo_url: event.xlargeimageurl,
            contributors: event.artists.map(artist => artist.name),
            description: event.description
        };
    });

    console.log('formatted skiddleEvents', formatedSkiddleEvents);
}
