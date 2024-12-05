import { supabase } from "./supabaseClient";

export default async function deleteAdminEvent (eventId) {
    const { data, error } = await supabase
      .from('admin_events')
      .delete()
      .eq('admin_event_id', 1)
      .select();
    if (data) {
      const event = data[0]
      return {event}
    } 
    if (error) {
      throw error
    }
}

