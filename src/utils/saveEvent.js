import { supabase } from "./supabaseClient";
import { getEventSource } from "./getEventSource";

export default async function saveEvent(profile, event) {
    
    const { data, error } = await supabase
        .from('saved_events')
        .insert({
            user_id: profile.id,
            source: getEventSource(event),
            admin_event_id: event.admin_event_id || null,
            skiddle_event_id: event.skiddle_event_id || null 
        })
        .select()
    if (data) {
        return { savedEvent: data[0] }
    }
    if (error) {
        throw { error }
    }
}

// Possible refactor 
// export default async function saveEvent(profile, event) {
//     try {
//         const { data } = await supabase
//             .from('saved_events')
//             .insert({
//                 user_id: profile.id,
//                 source: getEventSource(event),
//                 admin_event_id: event.admin_event_id || null,
//                 skiddle_event_id: event.skiddle_event_id || null
//             })
//             .select();

//         return { savedEvent: data[0] }; 
//     } 
//     catch (error) {
//         console.error("Error saving event:", error);
//         throw error;
//     }
// }