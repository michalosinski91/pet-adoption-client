import React from 'react'
import { Container, Message, Dropdown, Header } from 'semantic-ui-react'

const AdminPanel = ({ shelters, currentUser}) => {

    //sorts the shelters by city name, creates a selection for the dropdown menu with links to each shelter's admin view
    const sortedShelters = shelters.sort((a, b) => (a.address.city > b.address.city) ? 1 : -1)
    const shelterSelection = sortedShelters.map(shelter => {
        return {
            key: shelter.id,
            text: <a href={`/admin/schroniska/${shelter.id}`}>{shelter.name}</a>,
            value: shelter.name,
            
        }
    })

    if (currentUser.permission !== 'ADMIN'){
        return(
            <Container style={{ margin: '50px', height: '100vh'}}>
                <Message 
                    warning 
                    size='big'
                    header='You are not authorized to view this page'
                    content='Please log in, then try again' 
                />
            </Container>
        )
    }
    return(
        <Container style={{ margin: '50px', height: '100vh'}}>
            <Header as='h2' textAlign='center'>Panel administracyjny</Header>
            <Dropdown 
                placeholder='Przejdz do schroniska' 
                fluid
                clearable
                selection 
                options={shelterSelection} />
        </Container>
    )
}

export default AdminPanel