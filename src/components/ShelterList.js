import React from 'react'
import ShelterCard from './ShelterCard'
import { Container, Header, Grid } from 'semantic-ui-react'


const ShelterList = ({ shelters }) => {
    //sorts the shelter list alphabetically by city name
    const sortedShelters = shelters.sort((a, b) => {
        return a.address.city.localeCompare(b.address.city)
    })

    return (
        <Container style={{ width: '100%', margin: '50px' }}>
            <Header as='h2' textAlign='center'>
                Mamy dane dotyczące {shelters.length} schronisk.
            </Header>
            <Grid columns={3} stackable padded centered>
                {sortedShelters.map(shelter => <Grid.Column style={{ minWidth: '300px'}} width={5} key={shelter.id}><ShelterCard key={shelter.id} shelter={shelter} /></Grid.Column>)}
            </Grid>
        </Container> 
    )
}

export default ShelterList