import React from 'react'
import Shelter from './Shelter'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

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



const ShelterList = () => {
    
    const { loading, error, data } = useQuery(ALL_SHELTERS)
    
    if (loading) return 'loading...'
    if (error)  return `Error! ${error.message}`
    
    //const shelterList = shelters.map(shelter => <Shelter key={shelter.id} shelter={shelter}/>)
    return (
        <div>
            <h3>We have details of {data.allShelters.length} animal shelters</h3>
            <h4>Find one near you!</h4>
            {data.allShelters.map(shelter => 
                <Shelter key={shelter.id} 
                shelter={shelter} 
            />)} 
        </div>
    )
}

export default ShelterList