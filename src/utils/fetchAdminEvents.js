import { supabase } from "./supabaseClient";
import { getDateTodayInYYYYMMDD } from "./getDateTodayInYYYYMMDD";
import { getDatePlusThirtyInYYYYMMDD } from "./getDatePlusThirtyInYYYYMMDD";

export default async function fetchAdminEvents(startDate, endDate, limit) {

    const searchFromDate = startDate || getDateTodayInYYYYMMDD()
    console.log('search from', searchFromDate);

    const searchUntilDate = endDate || getDatePlusThirtyInYYYYMMDD(searchFromDate)
    console.log('until', searchUntilDate);
    

    const { data, error } = await supabase
        .from('admin_events')
        .select()
        .limit(limit)
    if (data) {
        return { events: data }
    }
    if (error) {
        throw { error }
    }
}