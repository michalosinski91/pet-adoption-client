import React from 'react'
import { Item, Header, Container, Button } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'


const ShelterEdit = ({ showPanel, shelter }) => {
    let checkShow = showPanel != 'editDetails' ? 'none' : ''
    return (
        <Container style={{ marginTop: '50px', display: checkShow}}>
            <Item.Group divided style={{ marginTop: '50px'}}>
                <Item>
                    <Item.Content>
                        <Item.Header>Nazwa</Item.Header>
                        <Item.Description>{shelter.name}</Item.Description>
                        <Button color='blue' floated='right'>Edytuj</Button>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Adress</Item.Header>
                        <Item.Description>{shelter.address.street}, {shelter.address.city}, {shelter.address.postcode}, {shelter.address.county}</Item.Description>
                        <Button color='blue' floated='right'>Edytuj</Button>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Telefon</Item.Header>
                        <Item.Description>{shelter.telephone}</Item.Description>
                        <Button color='blue' floated='right'>Edytuj</Button>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Strona internetowa</Item.Header>
                        <Item.Description>{shelter.website}</Item.Description>
                        <Button color='blue' floated='right'>Edytuj</Button>
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Content>
                        <Item.Header>Usun Placówke</Item.Header>
                        <Item.Meta>Usun konto placówki {shelter.name} z naszego serwisu</Item.Meta>
                        <Item.Description>UWAGA - TA OPERACJA NIEODWRACALNIE USUNIE WSZYSTKIE DANE TEGO UZYTKOWNIKA Z NASZEGO SYSTEMU</Item.Description>
                        <Button negative floated='right'>Usun konto</Button>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Container>
    )
}

export default ShelterEdit