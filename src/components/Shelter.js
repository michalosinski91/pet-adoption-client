import React from 'react'


const Shelter = ({ shelter }) => {
    return(
        <div>
            <p>{shelter.name}</p>
            <p>{shelter.address.city}</p>
        </div>
    )
}

export default Shelter