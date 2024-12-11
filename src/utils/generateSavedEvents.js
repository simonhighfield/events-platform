import fetchAdminEventById from "./fetchAdminEventById";
import fetchSkiddleEventById from "./fetchSkiddleEventById";

export function generateSavedEvents(savedEvents) {
    return Promise.all(savedEvents.map(async (savedEvent) => {
        if (savedEvent.source === 'admin') {
            const { event, error } = await fetchAdminEventById(savedEvent.admin_event_id);
            if (event) {
                console.log('fetched this event', event);
                return event;
            }
            if (error) {
                console.error('Error fetching admin event:', error);
                throw { error };
            }
        } else if (savedEvent.source === 'skiddle') {
            fetchSkiddleEventById(savedEvent.skiddle_event_id)
        }
        return null;
    }));
}
