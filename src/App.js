import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route, 
} from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo'

import { Container, Loader } from 'semantic-ui-react'

import ScrollToTop from './hocs/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShelterList from './components/ShelterList'
import Shelter from './components/Shelter'
import ShelterAdmin from './components/ShelterAdmin'
import UserAdmin from './components/UserAdmin'
import GoogleMap from './components/GoogleMap'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import AdminPanel from './components/AdminPanel'

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
                administrator{
                    id
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
const CURRENT_USER = gql`
    {
        me {
            id
            username
            email
            permission
            shelter
        }
    }
`

const ADD_SHELTER = gql`
    mutation addShelter($name: String!, $street: String!, $city: String!, $postcode: String!, $county: String!, $telephone: String, $website: String, $longitude: Float, $latitude: Float ){
        addShelter(name: $name, street: $street, city: $city, postcode: $postcode, county: $county, telephone: $telephone, website: $website, longitude: $longitude, latitude: $latitude){
            id
            name
            address{
                street
                city
            }
            website
            telephone
            coordinates{
                latitude
                longitude
            }
        }
    }
`



const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    const client = useApolloClient()

    useEffect(() => {
        // if a token exists in localStorage, it is passed to state, and handleSetCurrentUser event triggered (refetch of CURRENT_USER query & setting of currentUser)
        const retrievedToken = localStorage.getItem('znajdz-schronisko')
        if (retrievedToken) {
            setToken(retrievedToken)
            handleSetCurrentUser()
            
        }
        
    }, [])

    const handleError = (error) => {
        setErrorMessage(error.graphQLErrors[0].message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
    // Queries ran for Current User & All Shelters - values are renamed to avoid overriding the variables (data, loading, error, etc)
    // TODO - re-write as custom hook to trigger execution of multiple queries
    const { data: shelterData, loading: shelterLoading, error: shelterError, refetch: shelterRefetch} = useQuery(ALL_SHELTERS)
    const { data: userData, refetch: userRefetch, error: userError } = useQuery(CURRENT_USER)

    const [login] = useMutation(LOGIN, {
        onError: handleError   
    })

    const [addShelter] = useMutation(ADD_SHELTER)

    const logout = () => {
        localStorage.clear()
        setToken(null)
        setCurrentUser(null)
        client.resetStore()
    }
    // refetches the CURRENT_USER query and passes the user data to state
    const handleSetCurrentUser = async () => {
        const { data } = await userRefetch()
        setCurrentUser({
            id: data.me.id,
            username: data.me.username,
            email: data.me.email,
            permission: data.me.permission,
            shelter: data.me.shelter
        })
    }
    const shelterById = (id) => shelterData.allShelters.find(shelter => shelter.id == id)
   
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
        onMount: addMarkers(shelterData.allShelters)
    }

    if (shelterLoading) {
        return(
            <Loader style={{ height: '100vh', marginTop: '300px'}} active inline='centered' />
        )
    }
    
    if (userError) {
        return (
            <p>Wystąpił błąd podczas zbierania danych o użytkowniku. Proszę spróbować ponownie</p>
        )
    }

    if (shelterError ) {
        return (
            <p>Wystąpił błąd podczas zbierania danych o schroniskach. Proszę spróować ponownie</p>
        )
    }

    return (
        <Container fluid>
            <Router>
                <ScrollToTop>
                    <Navbar token={token} logout={logout} currentUser={currentUser}/>
                    <Route exact path='/' render={() => <GoogleMap {...mapProps}/>} />
                    <Route exact path='/schroniska' render={() => <ShelterList shelters={shelterData.allShelters} /> } />
                    <Route exact path='/admin/schroniska/:id' render={({ match }) => <ShelterAdmin shelter={shelterById(match.params.id)} currentUser={currentUser} shelterRefetch={shelterRefetch} />} />
                    <Route exact path='/schroniska/:id' render={({ match }) => <Shelter shelter={shelterById(match.params.id)}/>} />
                    <Route exact path='/uzytkownik/:id' render={({ match }) => <UserAdmin userId={match.params.id} currentUser={currentUser} />}  /> 
                    <Route exact path='/login' render={() => <LoginForm login={login} setToken={(token) => setToken(token)} setCurrentUser={handleSetCurrentUser} />} />
                    <Route exact path='/register' render={() => <RegistrationForm />} />
                    <Route exact path='/adminpanel' render={() => <AdminPanel currentUser={currentUser} shelters={shelterData.allShelters} />} />
                    <Footer />
                </ScrollToTop>
            </Router>
        </Container>
    )
}

export default App