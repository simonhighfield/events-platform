import { supabase } from "./supabaseClient";

export default async function deleteAdminEvent () {
    const { data, error } = await supabase
      .from('admin_events')
      .delete()
      .eq('id', eventId);
    
    if (error) {
      console.error('Error deleting event:', error);
    } else {
      console.log('Deleted event:', data);
    }
}

