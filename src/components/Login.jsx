import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasAccount, setHasAccount] = useState(true)

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        
        if (hasAccount) {
            const { error } = await supabase.auth.signInWithPassword({ 
                email: email,
                password: password
            })
            if (error) {
                alert(error.error_description || error.message)
            } 
        } else {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (data) {
                console.log('signed up user: ', data.user.id);
            }
            if (error) {
                alert(error.error_description || error.message)
            }
        }

        setLoading(false)
    }

    function toggleHasAccount() {
        setHasAccount (!hasAccount)
        setPassword ('')
    }

    return (
        <>
            <p className="description">{hasAccount ? "Sign in with your email below" : "Sign up with your email below"}</p>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                    className="inputField"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    className="inputField"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!hasAccount && password.length < 6 ? <span>password must be 6 or more characters </span>: null}
                <div>
                    <button disabled={loading}>
                    {loading ? <span>Loading</span> : <span>{hasAccount ? "Sign in" : "Sign up"}</span>}
                    </button>
                </div>
            </form>
            <button onClick={toggleHasAccount}>{hasAccount ? "Don't have an account? Create one here" : "Have an account already? Log in here"}</button>            
        </>
    )
}