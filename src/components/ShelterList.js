import React from 'react'
import Shelter from './Shelter'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'





const ShelterList = ({ shelters }) => {
    return (
        <div>
            <h3>We have details of {shelters.length} animal shelters</h3>
            <h4>Find one near you!</h4>
            {shelters.map(shelter => 
                <Shelter key={shelter.id} 
                shelter={shelter} 
            />)} 
        </div>
    )
}

export default ShelterList