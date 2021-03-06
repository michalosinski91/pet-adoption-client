import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react'

const Footer = () => {
    return (
        <Segment inverted vertical style={{ pading: '5em 0em'}}>
            <Container>
                <Grid divided inverted>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header inverted as='h4' content='O projekcie' />
                            <p>Ten serwis został stworzny jako element nauki programowania w języku JavaScript.</p> 
                            <p>    
                                Dane schronisk zebrałem poprzez web-scraping z użyciem Puppeteer. Informacje są przechowywane w serwisie MongoDB Atlas.
                                Logika serwera napisana jest w Node.js przy użyciu GraphQL i ApolloServer.
                                Do stworzenia frontend-u użyte zostały React, Apollo, SemanticUI i Google Maps API.
                                Kod strony dostepny jest tutaj: Github
                            </p>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header inverted as='h4' content='Wykorzystane technologie' />
                            <List link inverted>
                                <List.Item><a href='https://www.apollographql.com/'>Apollo</a></List.Item>
                                <List.Item><a href='https://graphql.org/'>GraphQL</a></List.Item>
                                <List.Item><a href='https://www.mongodb.com/cloud/atlas'>MongoDB Atlas</a></List.Item>
                                <List.Item><a href='https://reactjs.org/'>React</a></List.Item>
                                <List.Item><a href='https://semantic-ui.com/'>SemanticUI</a></List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}

export default Footer