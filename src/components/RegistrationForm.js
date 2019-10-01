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
 
    const [createUser] = useMutation(CREATE_USER)

    const submit = async (event) => {
        event.preventDefault()
        setLoadingButton(true)
        if (password !== repeatPassword) {
            setErrorMessage('Hasła się nie zgadzają')
            setLoadingButton(false)
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
                            <Form.Field>
                                <label>Nazwa użytkownika</label>
                                <input value={username} onChange={({ target }) => setUsername(target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Adres e-mail</label>
                                <input value={email} onChange={({ target }) => setEmail(target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Hasło</label>
                                <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Powtórz hasło</label>
                                <input type='password' value={repeatPassword} onChange={({ target }) => setRepeatPassword(target.value)}/>
                            </Form.Field>
                            <Form.Button size='large' color='blue' fluid type='submit' loading={loadingButton}>Załóż Konto</Form.Button>
                        </Form>
                        <Message>
                            Masz już konto? <a href='/login'> Zaloguj się</a>
                        </Message>
                    </>
                    : <Redirect />
                }
                
            </Grid.Column>
        </Grid>     
    )
}

export default RegistrationForm