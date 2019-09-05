import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Navbar = ({ token, logout, currentUser }) => {
    const [activeItem, setActiveItem] = useState('')

    return (
        <Menu style={{ margin: 0}} stackable>
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

            <Menu.Menu position="right">
                {token && currentUser
                    ? <>
                        {currentUser.shelter
                            ? <Menu.Item
                            name='shelter'
                            active={activeItem === 'shelter'}
                            onClick={() => setActiveItem('shelter')}
                            as={Link}
                            to={`/admin/schroniska/${currentUser.shelter}`}
                            >Konto placówki</Menu.Item>
                            : null
                        }
                        {currentUser.permission === 'ADMIN'
                            ? <Menu.Item
                            name='admin'
                            active={activeItem === 'admin'}
                            onClick={() => setActiveItem('admin')}
                            as={Link}
                            to={'/adminpanel'}
                            >Panel administracyjny</Menu.Item>
                            : null
                        }
                        <Menu.Item
                            name='user'
                            active={activeItem === 'user'}
                            onClick={() => setActiveItem('user')}
                            as={Link}
                            to={`/uzytkownik/${currentUser.id}`}
                        >
                            Konto Uzytkownika
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
                            active={activeItem === 'login'}
                            onClick={() => setActiveItem('login')}
                            as={Link}
                            to='/login'
                        >
                            Zaloguj sie
                        </Menu.Item>
                        <Menu.Item
                            name='rejstracja'
                            active={activeItem === 'rejstracja'}
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