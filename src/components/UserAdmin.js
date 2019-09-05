import React, { useState } from 'react'
import { Header, Form, Container, Message, Loader, Item, Button } from 'semantic-ui-react'
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost'

const FIND_USER = gql`
    query findUser($id: String!){
        findUser(id: $id) {
            id
            username
            email
            permission
            shelter
        }
    }
`

const UPDATE_EMAIL = gql`
    mutation updateUserEmail($id: String! $email: String!){
        updateUserEmail(
            id: $id
            email: $email
        ) {
            id
            username
            email
            permission
            shelter
        }
    }
`

const UserAdmin = ({ userId, currentUser }) => {
    const [newEmail, setNewEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [accountToDelete, setAccountToDelete] = useState('')
    const [password, setPassword] = useState('')
    const [activeEmailChange, setActiveEmailChange] = useState(false)
    const [activePasswordChange, setActivePasswordChange] = useState(false)
    const [activeDeleteAccount, setActiveDeleteAccount] = useState(false)

    
    
    const  {data, loading, refetch} = useQuery(FIND_USER, {
        variables: {
            id: userId
        }
    })

    const [updateUserEmail, { loading: EmailUpdateLoading }] = useMutation(UPDATE_EMAIL)

    //TODO: LINK FUNCTIONALITY WITH DB - need to write resolvers
    const handleEmailChange = async (event) => {
        event.preventDefault()
        try {
            const result = await updateUserEmail({
                variables: {
                    id: data.findUser.id,
                    email: newEmail
                }
            })
            refetch()
            setNewEmail('')
            setActiveEmailChange(false)
        } catch (error) {
            console.log(error)
        }

    }

    const handlePasswordChange = async (event) => {
        event.preventDefault()
        setOldPassword('')
        setNewPassword('')
        setRepeatNewPassword('')
        setActivePasswordChange(false)
    }

    const handleDeleteAccount = (event) => {
        event.preventDefault()
    }

    if (loading) {
        return(
            <Loader style={{ height: '100vh', marginTop: '100px'}} active inline='centered' />
        )
    }
    if (data.findUser && data.findUser.id !== currentUser.id) {
        return(
            <Container style={{ margin: '50px', minHeight: '100vh'}}>
                <Header as='h2' textAlign='center'>Profil uzytkownika {data.findUser.username}</Header>
                <Message 
                    warning 
                    size='big'
                    header='You are not authorized to view this page'
                    content='Please log in, then try again' 
                />
            </Container>
        )
    }

    return (
        <Container style={{ margin: '50px', minHeight: '100vh'}}>
            <Header as='h2' textAlign='center'>Profil uzytkownika {data.findUser.username}</Header>
            <Item.Group divided style={{ marginTop: 100}}>
                <Item>
                    <Item.Content>
                        <Item.Header>Nazwa uzytkownika</Item.Header>
                        <Item.Meta>Nazwa uzytkownika nie moze byc zmieniona</Item.Meta>
                        <Item.Description>{data.findUser.username}</Item.Description>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Email</Item.Header>
                        <Item.Meta>Zmien adres email dla tego konta</Item.Meta>
                        <Item.Description>{data.findUser.email}</Item.Description>
                        <Button color='blue' floated='right' onClick={() => setActiveEmailChange(true)}>Edytuj</Button>
                        {activeEmailChange 
                            ? <Form onSubmit={handleEmailChange}>
                                <Form.Field required width={6}>
                                    <label>Nowy adres email</label>
                                    <input value={newEmail} onChange={({ target }) => setNewEmail(target.value)} />
                                </Form.Field>
                                <Form.Button color='blue' type='submit' loading={EmailUpdateLoading}>
                                    Zmien Adres Email
                                </Form.Button>
                            </Form> 
                            : null
                        }
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Haslo</Item.Header>
                        <Item.Meta>Zmien haslo</Item.Meta>
                        <Button color='blue' floated='right' onClick={() => setActivePasswordChange(true)}>Edytuj</Button>
                        {activePasswordChange
                            ? <Form onSubmit={handlePasswordChange}>
                                <Form.Field required width={6}>
                                    <label>Obecne Haslo</label>
                                    <input type='password' value={oldPassword} onChange={({ target }) => setOldPassword(target.value)} />
                                </Form.Field>
                                <Form.Field required width={6}>
                                    <label>Nowe Haslo</label>
                                    <input type='password' value={newPassword} onChange={({ target }) => setNewPassword(target.value)} />
                                </Form.Field>
                                <Form.Field required width={6}>
                                    <label>Powtorz Nowe Haslo</label>
                                    <input type='password' value={repeatNewPassword} onChange={({ target }) => setRepeatNewPassword(target.value)} />
                                </Form.Field>
                                <Form.Button color='blue' type='submit'>
                                    Zmien Haslo
                                </Form.Button>
                            </Form>
                            : null
                        }
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Usun Konto</Item.Header>
                        <Item.Meta>Usun konto uzytownika {data.findUser.username} z naszego serwisu</Item.Meta>
                        <Item.Description>UWAGA - TA OPERACJA NIEODWRACALNIE USUNIE WSZYSTKIE DANE TEGO UZYTKOWNIKA Z NASZEGO SYSTEMU</Item.Description>
                        <Button negative floated='right' onClick={() => setActiveDeleteAccount(true)}>Usun konto</Button>
                        {activeDeleteAccount
                            ? <Form onSubmit={handleDeleteAccount}>
                                <Header style={{ marginTop: 50}}>Prosze wprowadzic Nazwe Uzytkownika i Haslo aby potwierdzic operacje usuniecia konta</Header>
                                <Form.Field required width={6}>
                                    <label>Nazwa Uzytkownika</label>
                                    <input value={accountToDelete} onChange={({ target }) => setAccountToDelete(target.value)} />
                                </Form.Field>
                                <Form.Field required width={6}>
                                    <label>Haslo</label>
                                    <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                                </Form.Field>
                                <Button negative type='submit'>Permanentnie Usun Konto</Button>
                            </Form>
                            : null
                        }
                    </Item.Content>
                </Item>
            </Item.Group>
        </Container>
    )
}

export default UserAdmin