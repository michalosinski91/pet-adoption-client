import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Segment, Item, Button, Grid, Header, Container, Form, Table, Dimmer, Modal, Image } from 'semantic-ui-react'

const Shelter = ({shelter}) => {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [messageSent, setMessageSent] = useState(false)

    console.log(shelter.animals)

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
            <Grid centered padded stackable columns={2}> 
                <Grid.Column width={6}>
                    <Grid.Row>
                        <Segment>
                            <Header as='h3' textAlign='center'>
                                Dane placówki
                            </Header>
                            <Table celled>
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
                <Grid.Column width={10}>
                    <Segment>
                        <Header as='h3' textAlign='center'>Zwierzeta z tej placówki</Header>
                        <Item.Group divided>
                            {shelter.animals.map(animal => <Item key={animal.id}>
                                <Modal trigger={<Item.Image size='medium' src={`${animal.image}`} />} basic closeIcon><Image src={`${animal.image}`} size='massive' /></Modal>
                                
                                <Item.Content>
                                    <Item.Header>{animal.name}</Item.Header>
                                    <Item.Meta>{animal.type}, {animal.breed}, {animal.age}</Item.Meta>
                                    <Item.Content>{animal.description}</Item.Content>
                                    <Item.Extra>
                                        <Button floated='left' color='blue'>
                                            Dowiedz sie wiecej
                                        </Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>)}
                        </Item.Group>
                        
                    </Segment>
                </Grid.Column>

            </Grid>
            
        </Container>
    )
}

export default Shelter