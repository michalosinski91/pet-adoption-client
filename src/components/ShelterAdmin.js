import React, { useState } from 'react'
import { Container, Header, Message, Menu } from 'semantic-ui-react'

import AddAnimal from './AddAnimal'
import ShelterMessages from './ShelterMessages'
import ShelterEdit from './ShelterEdit'
import AnimalEdit from './AnimalEdit'


const ShelterAdmin = ({ shelter, currentUser, shelterRefetch }) => {
    const [showPanel, setShowPanel] = useState('editDetails')

    //checks if the shelter and current user details match
    //if details match, shows the admin panel - opens on Messages by default, shows a menu with choice of 4 panels
    //DEVELOPMENT ONLY - ADMIN ACCOUNT HAS ACCESS TO THIS VIEW AND OPTIONS AS WELL - REMOVE PRIOR TO DEPLOYMENT
    if ( currentUser.permission === 'ADMIN' || shelter.administrator.id === currentUser.id) {
        return (
            <Container style={{ margin: '50px', minHeight: '100vh'}}>
                <Header as='h2' textAlign='center'>Profil administracyjny: {shelter.name}</Header>
                <Menu fluid widths={4}>
                    <Menu.Item name='Wiadomosci' active={showPanel == 'messages'} onClick={() => setShowPanel('messages')} />
                    <Menu.Item name='Dane Placówki' active={showPanel == 'editDetails'} onClick={() => setShowPanel('editDetails')} />
                    <Menu.Item name='Zwierzeta' active={showPanel == 'editAnimals'} onClick={() => setShowPanel('editAnimals')} /> 
                    <Menu.Item name='Dodaj Zwierze' active={showPanel == 'addAnimal'} onClick={() => setShowPanel('addAnimal')} />    
                </Menu>
                <ShelterMessages showPanel={showPanel} shelter={shelter} />
                <ShelterEdit showPanel={showPanel} shelter={shelter} />
                <AnimalEdit showPanel={showPanel} shelter={shelter} shelterRefetch={shelterRefetch} />
                <AddAnimal showPanel={showPanel} shelterID={shelter.id} shelterRefetch={shelterRefetch} />
            </Container>
        )
    }
    
    // if details do not match, shows an 'unauthorized' message
    return(
        <Container style={{ margin: '50px', height: '100vh'}}>
            <Header as='h2' textAlign='center'>Profil administracyjny: {shelter.name}</Header>
            <Message 
                warning 
                size='big'
                header='You are not authorized to view this page'
                content='Please log in, then try again' 
            />
        </Container>
    )

    
}

export default ShelterAdmin