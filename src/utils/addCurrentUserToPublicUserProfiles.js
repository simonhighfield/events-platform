import { supabase } from "./supabaseClient";

export async function addCurrentUserToPublicUserProfiles(session) {

  const { data, error } = await supabase
    .from('profiles')
    .insert({ id: session.user.id, updated_at: new Date(), username: session.user.email, is_admin: false, profile_photo_url: '' });
  if (data) {
    console.log('sucesfully posted to profiles with the data: ', data);
  }
  if (error) {
    alert(error.error_description || error.message);
  }
}
