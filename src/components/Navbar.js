import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ token, logout }) => {
    
    return (
        <div style={{ height: '50px'}}>
            <Link to='/'>Mapa</Link>
            <Link to='/schroniska'>Schroniska</Link>
            <Link to='/omnie'>O Mnie</Link>
            {!token 
            ? <div>
                <Link to='/login'>Zaloguj Się</Link> 
                <Link to='/register'>Zaloz konto</Link>
            </div>
            : <Link to='/' onClick={() => logout()}>Wyloguj Sie</Link>
            }
            
        </div>
    )
}

export default Navbar