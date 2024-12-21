import { useContext } from 'react';
import { ProfileContext } from '../Contexts';
import paramsForTestAdminEvent from '../data/paramsForTestAdminEvent';
import { postAdminEvent } from '../utils/postAdminEvent';

export default function AddEventPage() {
    const { profile } = useContext(ProfileContext)

    function handlePostAdminEvent() {
        paramsForTestAdminEvent.admin_id = profile.id
        postAdminEvent(paramsForTestAdminEvent)
        .then(({ event })=> {
            console.log('successfully posted: ', event);
        })
        .catch(({ error }) => {
            console.log(error);
        })
    }


    return (
        <main className='responsive-page-sizing'>
           <h1>AddEventPage.jsx</h1>
           <button onClick={handlePostAdminEvent}>post test admin event</button>
        </main>
    )
}