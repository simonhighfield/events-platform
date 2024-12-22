import { supabase } from "./supabaseClient";

export default async function deleteSavedEventById(savedEventId) {  
  try {
    const { data, error } = await supabase
      .from('saved_events')
      .delete()
      .eq('id', savedEventId)
      .select();
    if (data) {
      console.log('in delete, deleted: ', data[0]);
      return { deletedEvent : data[0]}
    }
  }
  catch (error) {
    throw error
  }
}