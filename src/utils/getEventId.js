import { getEventSource } from './getEventSource';

export default function getEventId(event) {
  if (getEventSource(event) === 'admin') {
    return event.admin_event_id;
  } else if (getEventSource(event) === 'skiddle') {
    return event.skiddle_event_id;
  }
}