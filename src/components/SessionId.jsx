import { useContext } from 'react'
import { SessionContext } from '../Contexts'

export default function SessionId () {
    const { session } = useContext(SessionContext);

    return (
        <>
        {session ? (<p>hello user {session.user.id}</p>) : (<p>not logged in</p>)}
        </>
    )
}