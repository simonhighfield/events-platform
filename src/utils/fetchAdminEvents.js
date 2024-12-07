import { supabase } from "./supabaseClient";

export default async function fetchAdminEvents(limit) {
    const { data, error } = await supabase
        .from('admin_events')
        .select()
        .limit(limit)
    if (data) {
        return { events: data }
    }
    if (error) {
        throw { error }
    }
}