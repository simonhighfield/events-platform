import { supabase } from "./supabaseClient";

export default async function saveEvent(profile, event) {

    function getEventSource(event) {
        if (event.admin_event_id) {
            return 'admin'
        } else if (event.skiddle_event_id) {
            return 'skiddle'
        }
    }

    const event_source = getEventSource(event)

    const { data, error } = await supabase
        .from('saved_events')
        .insert({
            user_id: profile.id,
            event_source,
            admin_event_id: '03b0ec4a-8222-4a50-845f-1dc5169f8e93',
        })
        .select()
    if (data) {
        return { savedEvent: data[0] }
    }
    if (error) {
        throw { error }
    }
}