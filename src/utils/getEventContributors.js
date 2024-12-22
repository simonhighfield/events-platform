export function getEventContributors(event) {
    const { contributors } = event;
    const contrString = contributors.toString();

    const regex = /,(?=\S)/g;
    const contrFormatted = contrString.replace(regex, ', ');

    return contrFormatted;
}
