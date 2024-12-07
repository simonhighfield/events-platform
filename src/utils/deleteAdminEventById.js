import { supabase } from "./supabaseClient";

export default async function deleteAdminEventById(eventId) {
  const { data, error } = await supabase
    .from('admin_events')
    .delete()
    .eq('admin_event_id', eventId)
    .select();
  if (data) {
    return { event : data[0]}
  }
  if (error) {
    throw {error}
  }
}

