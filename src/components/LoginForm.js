import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'



const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        const result = await props.login({
            variables: { username, password}
        })

        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('znajdz-schronisko', token)
            setUsername('')
            setPassword('')
            props.history.push('/')
        }
    }


    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Nazwa Uzytkownika: <input 
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Haslo: <input 
                        value={password}
                        type='password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>Zaloguj sie</button>
            </form>
        </div>
    )

}

export default withRouter(LoginForm)