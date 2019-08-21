import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShelterList from './components/ShelterList'

const App = () => {
    /*const [shelters, setShelters] = useState([])

    useEffect(() => {
        shelterService
            .getAll()
            .then(initialShelterList => {
                setShelters(initialShelterList)
            })
    }, [])
*/
    return (
        <div>
            <Navbar />
            <Header />
            <ShelterList />
            <Footer />
        </div>
    )
}

export default App