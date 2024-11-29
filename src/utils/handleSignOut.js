import { supabase } from "./supabaseClient";

export function handleSignOut() {
  supabase.auth.signOut()
  .catch((err) => {
    console.log(`error in handleSignOut: ${err}`);
  });
}
