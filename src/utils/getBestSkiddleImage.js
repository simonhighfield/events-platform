export default function getBestImageFromSkiddlEvent(skiddleEvent) {
    if (skiddleEvent.xlargeimageurl) {
        return skiddleEvent.xlargeimageurl
    } else if (skiddleEvent.largeimageurl) {
        return skiddleEvent.largeimageurl
    }  else {
        return skiddleEvent.imageurl
    }
}