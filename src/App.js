import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route, 
} from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo'

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
    

    if (loading) {
        return 'Ladujemy dane'
    }
    return (
        <div>
            <Router>
                <Navbar token={token} logout={logout}/>
                <Route exact path='/' render={() => <GoogleMap shelters={data.allShelters}/>} />
                <Route exact path='/schroniska' render={() => <ShelterList shelters={data.allShelters} /> } />
                <Route exact path='/schroniska/:id' render={({ match }) => <Shelter shelter={shelterById(match.params.id)} />} />
                <Route exact path='/login' render={() => <LoginForm login={login} setToken={(token) => setToken(token)} />} />
                <Route exact path='/register' render={() => <RegistrationForm />} />
                <Footer />
            </Router>
        </div>
    )
}

export default App