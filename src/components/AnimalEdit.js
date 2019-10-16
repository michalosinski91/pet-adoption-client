import React, { useState } from 'react'
import { Item, Button, Message } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'

const REMOVE_ANIMAL = gql`
    mutation removeAnimal($id: String!, $shelter: String!) {
        removeAnimal(
            id: $id
            shelter: $shelter
        ){
            id
        }
    }
`

const AnimalEdit = ({ showPanel, shelter, shelterRefetch }) => {
    let checkShow = showPanel != 'editAnimals' ? 'none' : ''
    const [removeAnimal] = useMutation(REMOVE_ANIMAL)

    const deleteAnimal = async (animal) => {
        try {
            const result = await removeAnimal({
                variables: {
                    id: animal.id,
                    shelter: shelter.id
                }
            })
            shelterRefetch()
        } catch (error) {
            console.log(error)
        }
    }

    //TODO - editing animal details

    return(
        <Item.Group divided style={{ marginTop: 50, display: checkShow}}>
            {shelter.animals.length > 0 
                ? shelter.animals.map(animal => <Item key={animal.id}>
                    <Item.Image size='medium' src={`${animal.image}`} />
                    <Item.Content>
                        <Item.Header>{animal.name}</Item.Header>
                        <Item.Meta>{animal.type}, {animal.breed}, {animal.age} lat</Item.Meta>
                        <Item.Content>{animal.description}</Item.Content>
                        <Item.Extra>
                            <Button floated='left' color='blue' disabled>
                                Edytuj
                            </Button>
                            <Button floated='left' color='red' onClick={() => deleteAnimal(animal)} >
                                Usuń
                            </Button>
                        </Item.Extra>
                    </Item.Content>
                </Item>)
                : <Message size='large'>
                    <Message.Header>
                        Obecnie brak informacji o zwierzętach z tej placówki
                    </Message.Header>
                </Message>
            }
        </Item.Group>
    )
}

export default AnimalEdit