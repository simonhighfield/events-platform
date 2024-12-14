import { useContext } from "react"
import { ProfileContext } from "../Contexts"

export default function Login() {
    const { profile } = useContext(ProfileContext)    

    // useEffect(() => {
    //     fetchAndSortAllEvents(skiddleParamsForClubEventsInManchester)
    //     .then(({ events }) => {
    //         setEventsFound(events)
    //     })
    //     .catch(({error}) => {
    //     })
    //     .finally(() => {
    //         setIsLoading(false)
    //     })
    // }, [])

    return (
        <main className='responsive-page-sizing'>
           <h1>SavedEventsPage.jsx</h1>
           <p>{profile.id}</p>
        </main>
    )
}