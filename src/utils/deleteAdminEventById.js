import { supabase } from "./supabaseClient";

export default async function deleteAdminEventById(eventId) {
  const { data, error } = await supabase
    .from('admin_events')
    .delete()
    .eq('admin_event_id', eventId)
    .select();
  if (data) {
    console.log('deleted', data[0] );
    return { deletedEvent : data[0]}
  }
  if (error) {
    console.error('Error deleting admin event by ID: ' + error.message)
    throw error
  }
}