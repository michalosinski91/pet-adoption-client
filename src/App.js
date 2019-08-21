import React, { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

import HomeMap from './components/HomeMap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShelterList from './components/ShelterList'

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
            }
        }
    `

const App = () => {


    const { data, loading } = useQuery(ALL_SHELTERS)

    if (loading) {
        return 'loading....'
    }
    return (
        <div>
            <Navbar />
            <HomeMap shelters={data.allShelters}/>
            <ShelterList shelters={data.allShelters} />
            <Footer />
        </div>
    )
}

export default App