import { useParams } from "react-router-dom";

export default function EventPage () {
    const { eventSource, eventId } = useParams();
    console.log(eventSource, eventId);
    
    return(
        <h1>event</h1>

    )
}