import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Header, Grid, Form, Message } from 'semantic-ui-react'

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
    const [loadingButton, setLoadingButton] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [usernameValid, setUsernameValid] = useState(false)
 
    const [createUser] = useMutation(CREATE_USER)

    const checkUsername = arg => {
        const re = /^[a-z0-9_-]{3,15}$/igm
        setUsernameValid(re.test(arg))
    }

    const checkEmail = arg => {
        const re = /\S+@\S+\.\S+/
        setEmailValid(re.test(arg))
    }
    const checkPassword = arg => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,12}$/
        setPasswordValid(re.test(arg))
    }
    const submit = async (event) => {
        event.preventDefault()
        setLoadingButton(true)
        if (password !== repeatPassword) {
            setErrorMessage('Hasła się nie zgadzają')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (username.length < 3) {
            setErrorMessage('Nazwa użytkownika jest za krótka - musi mieć co najmniej 3 znaki')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (username.length > 15) {
            setErrorMessage('Nazwa użytkownika jest za długa - musi mieć nie więcej niż 15 znaków')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (email.length < 1) {
            setErrorMessage('Podaj adres e-mail')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (password.length < 6 || password.length > 12) {
            setErrorMessage('Hasło musi mieć długość między 6 a 12 znaków')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }

        if (repeatPassword.length < 6 || repeatPassword.length > 12) {
            setErrorMessage('Hasło musi mieć długość między 6-12 znaków')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (!usernameValid) {
            setErrorMessage('Nazwa użytkownika zawiera niedozwolone znaki - powinna zawierać tylko litery, cyfry lub znak "-"')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (!emailValid) {
            setErrorMessage('E-mail niepoprawny - musi mieć format xxxx@xxxx.xx')
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (!passwordValid) {
            setErrorMessage(`Hasło nie spełnia wymogów - musi mieć długość między 6-12 znaków, i zawierać co najmniej 1 literę małą, 1 literę dużą, 1 cyfrę i 1 znak specjalny (#$^+=!*()@%&)`)
            setLoadingButton(false)
            setTimeout(() => {
                setErrorMessage(null)
            }, 8000)
            return
        }
        try {
            const result = await createUser({
                variables: { email, username, password }
            })
        } catch (error) {
            setLoadingButton(false)
            console.log(error)
        }
        setUsername('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setRegistrationSuccess(true)
        

    }

    const Redirect = () => {
        return(
            <Message positive>
                Konto zostało założone
                <a href='/login'>Zaloguj się</a>
            </Message>
        )
    }

    return(
        <Grid textAlign='center' style={{ minHeight: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450}}>
                {!registrationSuccess
                    ? <>
                        <Header as='h2' textAlign='center'>
                            Załóż nowe konto
                        </Header>
                        <Form size='large' onSubmit={submit}>
                            <Form.Field required>
                                <label>Nazwa użytkownika</label>
                                <input value={username} onChange={({ target }) => {
                                    setUsername(target.value)
                                    checkUsername(target.value)
                                }}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Adres e-mail</label>
                                <input value={email} onChange={({ target }) => {
                                    setEmail(target.value)
                                    checkEmail(target.value)
                                }} />
                            </Form.Field>
                            <Form.Field required>
                                <label>Hasło</label>
                                <input type='password' value={password} onChange={({ target }) => {
                                    setPassword(target.value)
                                    checkPassword(target.value)             
                                }}/>
                            </Form.Field>
                            <Form.Field required>
                                <label>Powtórz hasło</label>
                                <input type='password' value={repeatPassword} onChange={({ target }) => setRepeatPassword(target.value)}/>
                            </Form.Field>
                            <Form.Button size='large' color='blue' fluid type='submit' loading={loadingButton}>Załóż Konto</Form.Button>
                        </Form>
                        {errorMessage &&
                            <Message negative>
                                {errorMessage}
                            </Message>
                        }
                        <Message>
                            Masz już konto?  <a href='/login'>  Zaloguj się</a>
                        </Message>
                    </>
                    : <Redirect />
                }
                
            </Grid.Column>
        </Grid>     
    )
}

export default RegistrationForm