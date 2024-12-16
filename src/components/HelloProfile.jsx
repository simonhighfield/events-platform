import { useContext } from 'react'
import { SessionContext } from '../Contexts'
import { ProfileContext } from '../Contexts'


export default function HelloProfile () {
    const { session } = useContext(SessionContext);
    const { profile } = useContext(ProfileContext);
    console.log(profile);
    

    return (
        <>
            {session ? (<p>Hello {profile.username}</p>) : (<p>not logged in</p>)}
        </>
    )
}