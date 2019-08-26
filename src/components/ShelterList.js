import React from 'react'
import ShelterCard from './ShelterCard'
import { Container, Header, Grid } from 'semantic-ui-react'


const ShelterList = ({ shelters }) => {
    return (
        <Container style={{ width: '100%', margin: '50px', height: '100vh'}}>
            <Header as='h2' textAlign='center'>
                Mamy dane dotyczące {shelters.length} schronisk.
            </Header>
            <Grid columns={3} stackable padded centered>
                {shelters.map(shelter => <Grid.Column width={5} key={shelter.id}><ShelterCard key={shelter.id} shelter={shelter} /></Grid.Column>)}
            </Grid>
        </Container>



        
    )
}

export default ShelterList