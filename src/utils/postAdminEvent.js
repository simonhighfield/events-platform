import { supabase } from "./supabaseClient";

export async function postAdminEvent({ admin_id, event_name, event_date, location, event_photo_url, contributors, description, additional_data }) {
    const { data, error } = await supabase
        .from('admin_events')
        .insert({
            admin_id,
            event_name,
            event_date,
            location,
            contributors,
            event_photo_url,
            description,
            additional_data
        })
        .select();
    if (data) {
        return data
    }
    if (error) {
        console.error(error.error_description || error.message)
        return error
    }
}
