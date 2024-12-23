import fetchAdminEventById from "./fetchAdminEventById";
import fetchSkiddleEventById from "./fetchSkiddleEventById";
import formatSkiddleEvent from "./formatSkiddleEvent";
import { sortEventsByDate } from "./sortEventsByDate";

export function generateSavedEvents(savedEvents) {
    return Promise.all(savedEvents.map(async (savedEvent) => {
        if (savedEvent.source === 'admin') {
            const { event, error } = await fetchAdminEventById(savedEvent.admin_event_id);
            if (event) {
                return event;
            }
            if (error) {
                throw {error};
            }
        } else if (savedEvent.source === 'skiddle') {
            const { event, error } = await fetchSkiddleEventById(savedEvent.skiddle_event_id)            
            if (event) {
                return formatSkiddleEvent(event)
            }
            if (error) {
                throw error;
            }
        }
        return null;
    }))
    .then((generatedEvents) => {    
        return sortEventsByDate(generatedEvents)
    });
}
