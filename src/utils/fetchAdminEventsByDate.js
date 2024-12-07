import { supabase } from "./supabaseClient";

export default async function fetchAdminEventsByDate(date) {
    const { data, error } = await supabase
        .from('admin_events')
        .select()
        .eq('event_date', date)
    if (data) {
        return { events: data }
    }
    if (error) {
        throw { error }
    }
}