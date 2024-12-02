import { supabase } from "./supabaseClient";

export function monitorSupabaseSession(setSession) {

  (function fetchInitialSession() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  })();

  return (function subscribeToSessionChanges() {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (_event === 'SIGNED_IN') {
        console.log('signed in');
      }
    });

    return () => subscription.unsubscribe();
  })();
}
