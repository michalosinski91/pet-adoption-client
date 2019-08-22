import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div style={{ height: '50px'}}>
            <Link to='/'>Mapa</Link>
            <Link to='/schroniska'>Schroniska</Link>
            <Link to='/login'>Zaloguj Się</Link>
            <Link to='/omnie'>O Mnie</Link>
        </div>
    )
}

export default Navbar