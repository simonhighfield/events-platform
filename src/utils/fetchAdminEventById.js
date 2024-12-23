import { supabase } from "./supabaseClient";

export default async function fetchAdminEventById(eventId) {
    const { data, error } = await supabase
        .from('admin_events')
        .select()
        .eq('admin_event_id', eventId)
    if (data) {
        return { event: data[0] }
    }
    if (error) {
        console.error('Error fetching admin event by Id: ' + error.message)
        throw error
    }
}