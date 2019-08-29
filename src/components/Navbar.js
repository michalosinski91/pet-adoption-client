import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navbar = ({ token, logout, currentUser }) => {
    const [activeItem, setActiveItem] = useState('')

    
    return (
        <Menu style={{ height: 50, margin: 0}}>
            <Menu.Item
                name='mapa'
                active={activeItem === 'mapa'}
                onClick={() => setActiveItem('mapa')}
                as={Link}
                to='/'
            >
                Mapa
            </Menu.Item>
            <Menu.Item
                name='schroniska'
                active={activeItem === 'schroniska'}
                onClick={() => setActiveItem('schroniska')}
                as={Link}
                to='/schroniska'
            >
                Schroniska
            </Menu.Item>
            <Menu.Item
                name='omnie'
                active={activeItem === 'omnie'}
                onClick={() => setActiveItem('omnie')}
                as={Link}
                to='/omnie'
            >
                O Mnie
            </Menu.Item>

            <Menu.Menu position="right">
                {token && currentUser
                    ? <>
                        <Menu.Item
                            name='user'
                            onClick={() => setActiveItem('user')}
                            as={Link}
                            to={`/uzytkownik/${currentUser.id}`}
                        >
                            Konto
                        </Menu.Item>
                        <Menu.Item
                            name='logout'
                            onClick={() => logout()}
                            as={Link}
                            to='/'
                        >
                            Wyloguj sie
                        </Menu.Item>
                    </>
                    : <>
                        <Menu.Item
                            name='login'
                            onClick={() => setActiveItem('login')}
                            as={Link}
                            to='/login'
                        >
                            Zaloguj sie
                        </Menu.Item>
                        <Menu.Item
                            name='rejstracja'
                            onClick={() => setActiveItem('rejstracja')}
                            as={Link}
                            to='/register'
                        >
                            Zaloz konto
                        </Menu.Item>
                    </>
                }
                
            </Menu.Menu>
      </Menu>
    )
}

export default Navbar