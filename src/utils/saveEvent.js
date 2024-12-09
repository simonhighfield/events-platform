import { supabase } from "./supabaseClient";

export default async function saveEvent(profile) {

    const { data, error } = await supabase
        .from('saved_events')
        .insert({
            user_id: profile.id,
            event_source: 'admin',
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