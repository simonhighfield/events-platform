import { supabase } from "./supabaseClient";

export default async function fetchSavedEventsByUserId(userId) {
    
    const { data, error } = await supabase
        .from('saved_events')
        .select()
        .eq('user_id', userId)
    if (data) {
        return { savedEvents: data }
    }
    if (error) {
        console.error('Error fetching saved events by user ID: ' + error.message)
        throw error
    }
}