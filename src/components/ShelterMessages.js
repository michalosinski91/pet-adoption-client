import React from 'react'
import { Item } from 'semantic-ui-react'

const ShelterMessages = ({ showPanel, shelter }) => {
    let checkShow = showPanel != 'messages' ? 'none' : ''
    return(
        <Item.Group divided style={{ marginTop: 50, display: checkShow}}>
            <Item>
                <Item.Content>
                    <Item.Header>Wiadomości</Item.Header>
                    {shelter.messages 
                        ? <p>Wiadomości</p>
                        : <p>Brak wiadomości</p>
                    }
                    
                </Item.Content>
            </Item>
        </Item.Group>
    )
}

export default ShelterMessages