import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Button, Header, Grid } from 'semantic-ui-react'


const ShelterCard = ({ shelter }) => {
    return(
        <Segment>
            <Header as='h3' textAlign='center'>{shelter.name}</Header>
            <Grid textAlign='center'>
                <Grid.Column>
                    <p>{`${shelter.address.street}, ${shelter.address.postcode} ${shelter.address.city}`}</p>
                    <p>{`woj. ${shelter.address.county}`}</p>
                    <p><strong>{`${shelter.animals.length} zwierzeta potrzebujace domu`}</strong></p>
                    <Button size='large' fluid color='blue' as={Link} to={`/schroniska/${shelter.id}`}>Zobacz szczegóły placówki</Button>
                </Grid.Column>
            </Grid>
        </Segment>
        
        
            
    )
}

export default ShelterCard