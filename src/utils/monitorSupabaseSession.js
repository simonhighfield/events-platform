import { supabase } from "./supabaseClient";
import fetchProfileById from "./fetchProfileById";

export function monitorSupabaseSession(setSession, setProfile) {

  (function fetchInitialSession() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session) {
        fetchProfileById(session.user.id).then((profile) => {
          console.log('line 12', profile);
          setProfile(profile)
        })
      }
    });
  })();

  return (function subscribeToSessionChanges() {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (_event === 'SIGNED_IN' && session) {
        fetchProfileById(session.user.id).then((profile) => {
          console.log('sign in', profile);
          setProfile(profile)
        })
      }
    });

    return () => subscription.unsubscribe();
  })();

}
