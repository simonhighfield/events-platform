import getBestSkiddleImage from "./getBestSkiddleImage"

export default function formatSkiddleEvent(skiddleEvent) {
    return {
            skiddle_event_id: skiddleEvent.id,
            created_at: null,
            event_name: skiddleEvent.eventname,
            event_date: skiddleEvent.startdate,
            location: skiddleEvent.venue.name,
            event_photo_url: getBestSkiddleImage(skiddleEvent),
            contributors: skiddleEvent.artists.map(artist => artist.name),
            description: skiddleEvent.description
    }
}