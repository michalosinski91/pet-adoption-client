import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Header, Grid, Form, Message } from 'semantic-ui-react'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loadingButton, setLoadingButton] = useState(false)

    const submit = async (event) => {
        event.preventDefault()
        setLoadingButton(true)
        const result = await props.login({
            variables: { username, password }
        })

        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            props.setCurrentUser()
            localStorage.setItem('znajdz-schronisko', token)
            props.history.push('/')
        }
    }

    return (
        <Grid textAlign='center' style={{ minHeight: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450}}>
                <Header as='h2' textAlign='center'>
                    Zaloguj się do konta
                </Header>
                <Form size='large' onSubmit={submit}>
                    <Form.Field>
                        <label>Nazwa użytkownika</label>
                        <input value={username} onChange={({ target }) => setUsername(target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hasło</label>
                        <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                    </Form.Field>
                    <Form.Button size='large' color='blue' fluid type='submit' loading={loadingButton}>Zaloguj się</Form.Button>
                </Form>
                <Message>
                    Nie masz jeszcze konta? <a href='/register'>Zarejestruj się</a>
                </Message>
            </Grid.Column>
        </Grid>

    )

}

export default withRouter(LoginForm)