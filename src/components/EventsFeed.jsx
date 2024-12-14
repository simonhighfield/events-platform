import { useContext } from 'react'
import { SessionContext } from '../Contexts'

export default function EventsFeed ({ events }) {
  const { session } = useContext(SessionContext);  

    return (
      <>
        {events.map((event) => {
          return <p>{event.event_name}</p>;
        })}
      </>
    );
}