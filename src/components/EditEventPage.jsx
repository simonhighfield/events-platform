import { useParams } from "react-router-dom";
import EventForm from "./EventForm";

export default function EditEventPage () {


    return(   
        <main className='responsive-page-sizing'>
           <h1>Edit event</h1>
           <EventForm></EventForm>
        </main>
    )
}