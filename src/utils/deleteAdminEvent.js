import { supabase } from "./supabaseClient";

export default async function deleteAdminEvent (eventId) {
    const { data, error } = await supabase
      .from('admin_events')
      .delete()
      .eq('admin_event_id', eventId)
      .select();
    if (data) {
      const event = data[0]
      return {event}
    } 
    if (error) {
      return Promise.reject(error)
    }
}

