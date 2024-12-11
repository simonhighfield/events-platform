import formatSkiddleEvent from "./formatSkiddleEvent";

export function formatSkiddleEvents(skiddleEvents) {
    return skiddleEvents.map(formatSkiddleEvent);
}