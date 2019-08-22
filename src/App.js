import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route, 
} from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

import HomeMap from './components/HomeMap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShelterList from './components/ShelterList'
import Shelter from './components/Shelter'
import GoogleMap from './components/GoogleMap'

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

const App = () => {

    const { data, loading } = useQuery(ALL_SHELTERS)
    
    const shelterById = (id) => data.allShelters.find(shelter => shelter.id == id)
    

    if (loading) {
        return 'loading....'
    }
    return (
        <div>
            <Router>
                <Navbar />
                <Route exact path='/' render={() => <GoogleMap shelters={data.allShelters}/>} />
                <Route exact path='/schroniska' render={() => <ShelterList shelters={data.allShelters} /> } />
                <Route exact path='/schroniska/:id' render={({ match }) => <Shelter shelter={shelterById(match.params.id)} />} />
                <Footer />
            </Router>
        </div>
    )
}

export default App