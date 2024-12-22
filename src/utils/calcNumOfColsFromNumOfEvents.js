export function calcNumOfColsFromNumOfEvents(events) {
  if (events.length === 1) {
    return 1;
  } else {
    return 2;
  }
}
