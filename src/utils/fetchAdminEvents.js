import { supabase } from "./supabaseClient";
import { getDateTodayInYYYYMMDD } from "./getDateTodayInYYYYMMDD";
import { getDatePlusThirtyInYYYYMMDD } from "./getDatePlusThirtyInYYYYMMDD";

export default async function fetchAdminEvents(startDate, endDate, limit) {

    const searchFromDate = startDate || getDateTodayInYYYYMMDD()

    const searchUntilDate = endDate || getDatePlusThirtyInYYYYMMDD(searchFromDate)

    const { data, error } = await supabase
        .from('admin_events')
        .select()
        .gte('event_date', searchFromDate)
        .lte('event_date', searchUntilDate) 
        .limit(limit)
    if (data) {
        return { adminEvents: data }
    }
    if (error) {
        throw error 
    }
}