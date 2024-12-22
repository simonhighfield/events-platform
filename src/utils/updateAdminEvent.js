import { supabase } from "./supabaseClient";

export async function updateAdminEvent(event) {
    const { admin_event_id, event_name, event_date, location, event_photo_url, contributors, description, additional_data } = event

    const { data, error } = await supabase
        .from('admin_events')
        .update({
            event_name,
            event_date,
            location,
            contributors,
            event_photo_url,
            description,
            additional_data
        })
        .eq('admin_event_id', admin_event_id)
        .select();

    if (data) {
        return {updatedEvent: data[0] }
    }
    if (error) {
        console.error(error)
        throw error
    }
}
