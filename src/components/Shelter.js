import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Segment, Item, Image, Button, Grid, Header, Container, Form, Table, Dimmer } from 'semantic-ui-react'

const Shelter = ({shelter}) => {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [messageSent, setMessageSent] = useState(false)

    const handleSubmitMessage = (event) => {
        event.preventDefault()

        setMessageSent(true)
        setTimeout(() => {
            setMessageSent(false)
        }, 3500)
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
    }

    return(
        <Container fluid style={{ width: '100%', margin: '50px'}}>
            <Header textAlign='center' as='h2'>
                {shelter.name}
            </Header>
            <Grid padded stackable columns={2}> 
                <Grid.Column width={6}>
                    <Grid.Row>
                        <Segment>
                            <Header as='h3' textAlign='center'>
                                Dane placówki
                            </Header>
                            <Table definition>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Adress
                                        </Table.Cell>
                                        <Table.Cell>
                                            {`${shelter.address.street}, ${shelter.address.postcode} ${shelter.address.city}`}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Wojewodztwo
                                        </Table.Cell>
                                        <Table.Cell>
                                            {`woj. ${shelter.address.county}`}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Telefon
                                        </Table.Cell>
                                        <Table.Cell>
                                            {shelter.telephone}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Strona internetowa
                                        </Table.Cell>
                                        <Table.Cell>
                                            <a href={`${shelter.website}`} target='blank'>{shelter.website}</a>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Button size='large' color='blue' fluid>Wspomoz placówke finansowo</Button>
                        </Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Dimmer.Dimmable as={Segment} dimmed={messageSent}>
                            <Header as='h3' textAlign='center'>
                                <p>Masz pytanie do placówki?</p>
                            </Header>
                            <Form onSubmit={handleSubmitMessage} >
                                <Form.Input required label='Imie i Nazwisko' value={name} onChange={({ target}) => setName(target.value)} />
                                <Form.Input required label='Email' value={email} onChange={({ target}) => setEmail(target.value)} />
                                <Form.Input label='Telefon' value={phone} onChange={({ target}) => setPhone(target.value)} />
                                <Form.TextArea required label='Wiadomosc' value={message} onChange={({ target }) => setMessage(target.value)} />
                                <Form.Button size='large' color='blue' fluid type='submit'>Wyslij wiadomosc</Form.Button>
                            </Form>
                            <Dimmer active={messageSent} onClick={() => setMessageSent(false)}>
                                <Header as='h2' inverted>Message Sent</Header>
                            </Dimmer>
                        </Dimmer.Dimmable>
                    </Grid.Row>

                </Grid.Column>
                <Grid.Column width={8}>
                    
                </Grid.Column>

            </Grid>
            
        </Container>
    )
}

export default Shelter