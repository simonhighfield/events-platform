export function getEventSource(event) {
    const { admin_event_id, skiddle_event_id } = event;

    if (admin_event_id) {
        return 'admin';
    } else if (skiddle_event_id) {
        return 'skiddle';
    }
    return null;
}
