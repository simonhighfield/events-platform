import { supabase } from "./supabaseClient";

export function handleSignOut() {
  supabase.auth.signOut()
  .catch((error) => {
    console.log(`error in handleSignOut: ${error}`);
  });
}
