import React, {useState} from 'react'
import { Segment, Item, Button, Grid, Header, Container, Form, Table, Dimmer, Modal, Image, Message, Popup } from 'semantic-ui-react'

const Shelter = ({ shelter }) => {
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [messageSent, setMessageSent] = useState(false)
    const [messageLoading, setMessageLoading] = useState(false)

    const handleSubmitMessage = (event) => {
        event.preventDefault()
        setMessageLoading(true)
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
        <Container fluid style={{ width: '100%', margin: '50px', minHeight: '100vh'}}>
            <Header textAlign='center' as='h2'>
                {shelter.name}
            </Header>
            <Grid centered padded relaxed stackable columns={2}> 
                <Grid.Column width={6} style={{ minWidth: '500px'}}>
                    <Grid.Row>
                        <Segment>
                            <Header as='h3' textAlign='center'>
                                Dane placówki
                            </Header>
                            <Table celled>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            Adres
                                        </Table.Cell>
                                        <Table.Cell>
                                            {`${shelter.address.street}, ${shelter.address.postcode} ${shelter.address.city}`}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            Województwo
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
                                            {shelter.website === "brak" 
                                                ? shelter.website 
                                                : <a href={`http://${shelter.website}`} target='blank'>{shelter.website}</a>
                                            }
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            <Popup 
                                content='Usługa obecnie niedostepna' 
                                hideOnScroll 
                                position='top center'
                                size='large'
                                trigger={<Button size='large' color='blue' fluid>Wspomóż placówkę finansowo</Button>} 
                            />
                        </Segment>
                    </Grid.Row>
                    <Grid.Row>
                        <Dimmer.Dimmable as={Segment} dimmed={messageSent} style={{ minWidth: '450px'}}>
                            <Header as='h3' textAlign='center'>
                                <p>Masz pytanie do placówki?</p>
                            </Header>
                            <Form onSubmit={handleSubmitMessage} >
                                <Form.Input required label='Imię' value={name} onChange={({ target}) => setName(target.value)} />
                                <Form.Input required label='Email' value={email} onChange={({ target}) => setEmail(target.value)} />
                                <Form.Input label='Telefon' value={phone} onChange={({ target}) => setPhone(target.value)} />
                                <Form.TextArea required label='Wiadomość' value={message} onChange={({ target }) => setMessage(target.value)} />
                                <Form.Button size='large' color='blue' fluid type='submit' loading={messageLoading} disabled>Wyślij wiadomość</Form.Button>
                            </Form>
                            <Dimmer active onClick={() => setMessageSent(false)}>
                                <Header as='h2' inverted>Pracuję nad tym :)</Header>
                            </Dimmer>
                        </Dimmer.Dimmable>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={8} style={{ minWidth: '600px'}}>
                    <Segment>
                        <Header as='h3' textAlign='center'>Zwierzęta z tej placówki</Header>
                        {shelter.animals.length > 0 
                            ? <Item.Group divided>
                                {shelter.animals.map(animal => <Item key={animal.id}>
                                    <Modal trigger={<Item.Image size='medium' src={`${animal.image}`} />} basic closeIcon><Image src={`${animal.image}`} size='massive' /></Modal>
                                    <Item.Content>
                                        <Item.Header>{animal.name}</Item.Header>
                                        <Item.Meta>{animal.type}, {animal.breed}, {animal.age}</Item.Meta>
                                        <Item.Content>{animal.description}</Item.Content>
                                    </Item.Content>
                                </Item>)}
                            </Item.Group>
                            : <Message size='large'>
                                <Message.Header>
                                    Obecnie brak informacji o zwierzętach z tej placówki
                                </Message.Header>
                            </Message>
                        }
                        
                        
                    </Segment>
                </Grid.Column>

            </Grid>
            
        </Container>
    )
}

export default Shelter