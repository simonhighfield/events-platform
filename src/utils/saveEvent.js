import { supabase } from "./supabaseClient";

export default async function saveEvent(profile, { admin_event_id, skiddle_event_id}) {

    const event_source = (function getEventSource() {
        if (admin_event_id) {
            return 'admin'
        } else if (skiddle_event_id) {
            return 'skiddle'
        }
        return null
    })()

    const { data, error } = await supabase
        .from('saved_events')
        .insert({
            user_id: profile.id,
            event_source,
            admin_event_id
        })
        .select()
    if (data) {
        return { savedEvent: data[0] }
    }
    if (error) {
        throw { error }
    }
}