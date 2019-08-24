import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import { Link } from 'react-router-dom'

const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!){
        createUser(        
            email: $email
            username: $username
            password: $password
        ){
            id
            email
            username
        }

    }
`


const RegistrationForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
 
    const [createUser] = useMutation(CREATE_USER)

    const submit = async (event) => {
        event.preventDefault()
        if (password !== repeatPassword) {
            setErrorMessage('Hasla sie nie zgadzaja')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }
        const result = await createUser({
            variables: { email, username, password }
        })
        console.log(result)
        setUsername('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setRegistrationSuccess(true)
        

    }

    const Redirect = () => {
        return(
            <div>
                <p>Konto zostalo zalozone</p>
                <Link to='/login'>Zaloguj sie tutaj</Link>
            </div>
        )
    }

    return(
        <div>
            {!registrationSuccess 
                ? <div>
                    <form onSubmit={submit}>
                        <div>
                            E-mail: <input 
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                            />
                        </div>
                        <div>
                            Nazwa uzytkownika: <input 
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
                        <div>
                            Powtorz Haslo: <input 
                                value={repeatPassword}
                                type='password'
                                onChange={({ target }) => setRepeatPassword(target.value)}
                            />
                        </div>
                        <button type='submit'>Zaloz konto</button>
                        {errorMessage}
                    </form>
                </div>
                : <Redirect />
            }
        </div>
        
    )
}

export default RegistrationForm