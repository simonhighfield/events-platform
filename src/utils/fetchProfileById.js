import { supabase } from "./supabaseClient";

export default function fetchProfileById(id) {
  return supabase.from('profiles').select().eq('id', id).then(({ data }) => {
    const profile = data[0];
        
    return profile
  })
  .catch(({ error }) => {
    console.log('error fetching profile: ', error);
  });
}