import { useContext } from 'react'
import { SessionContext } from '../Contexts'

export default function EventsFeed ({ events }) {
    console.log(events);
    
    const { session } = useContext(SessionContext);

    return (
      <>
        {events
          ? events.map((event) => {
              return <p>{event.event_name}</p>;
            })
          : null}
      </>
    );
}