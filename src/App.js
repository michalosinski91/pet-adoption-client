import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route, 
} from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo'

import { Container } from 'semantic-ui-react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShelterList from './components/ShelterList'
import Shelter from './components/Shelter'
import GoogleMap from './components/GoogleMap'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

const ALL_SHELTERS = gql`
        {
            allShelters {
                id
                name
                address{
                    street
                    city
                    postcode
                    county
                }
                telephone
                website
                coordinates{
                    latitude
                    longitude
                  }
                animals{
                    id
                    name
                    type
                    breed
                    age
                    description
                    image
                }
            }
        }
`
const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`


const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)

    const client = useApolloClient()
    
    useEffect(() => {
        const retrievedToken = localStorage.getItem('znajdz-schronisko')
        if (retrievedToken) {
            setToken(retrievedToken)
        }
    }, [])


    const handleError = (error) => {
        setErrorMessage(error.graphQLErrors[0].message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const { data, loading } = useQuery(ALL_SHELTERS)

    const [login] = useMutation(LOGIN, {
        onError: handleError
    })
    const logout = () => {
        localStorage.clear()
        setToken(null)
        client.resetStore()
    }

    const shelterById = (id) => data.allShelters.find(shelter => shelter.id == id)
   
    const addMarkers = shelters => map => shelters.map(shelter => {
        const marker = new window.google.maps.Marker({
            map,
            position: {
                lat: shelter.coordinates.latitude,
                lng: shelter.coordinates.longitude
            }
        }) 
        const contentString = `<a href='/schroniska/${shelter.id}'>${shelter.name}</a>`
        const info = new window.google.maps.InfoWindow({
            content: contentString,
        })
        marker.addListener('click', () => {
            info.open(map, marker)
            setTimeout(() => {
                info.close()
            }, 3500)
        })
    })

    const mapProps = {
        options: {
            center: { 
                lat: 52.1830643, 
                lng: 18.8839713
            },
            zoom: 7,
            //disableDefaultUI: true
        },
        onMount: addMarkers(data.allShelters)
    }

    if (loading) {
        return 'Ladujemy dane'
    }
    return (
        <Container fluid>
            <Router>
                <Navbar token={token} logout={logout}/>
                <Route exact path='/' render={() => <GoogleMap {...mapProps}/>} />
                <Route exact path='/schroniska' render={() => <ShelterList shelters={data.allShelters} /> } />
                <Route exact path='/schroniska/:id' render={({ match }) => <Shelter shelter={shelterById(match.params.id)} />} />
                <Route exact path='/login' render={() => <LoginForm login={login} setToken={(token) => setToken(token)} />} />
                <Route exact path='/register' render={() => <RegistrationForm />} />
                <Footer />
            </Router>
        </Container>
    )
}

export default App