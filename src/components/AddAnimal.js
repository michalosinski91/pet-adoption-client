import React, {useState, useRef} from 'react'
import {  Header, Form, Grid, Radio, Message, Image } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'

const ADD_ANIMAL = gql`
    mutation addAnimal($name: String!, $type: String!, $breed: String!, $age: String!, $description: String!, $image: String!, $shelter: String!){
        addAnimal( 
            name: $name
            type: $type
            breed: $breed
            age: $age
            description: $description
            image: $image
            shelter: $shelter
        ){
            id
            name
            type
            breed
            age
            description
            image
        }
    }
`

const AddAnimal = ({ showPanel, shelterID, shelterRefetch }) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('https://res.cloudinary.com/dke68lmlo/image/upload/v1567508001/pet-adoption/brak_zdjecia.png')
    const [formSuccess, setFormSuccess] = useState(false)

    const fileInputRef = useRef()

    const [addAnimal, { loading }] = useMutation(ADD_ANIMAL)

    //TO DO - finish adding animal
    const handleAddAnimal = async (event) => {
        event.preventDefault()
        try {
            const result = await addAnimal({
                variables: { 
                    name, 
                    type, 
                    breed, 
                    age, 
                    description, 
                    image, 
                    shelter: shelterID 
                }
                
            })
            console.log(result)
            shelterRefetch()
            setFormSuccess(true)
            setTimeout(() => {
                setFormSuccess(false)
            }, 3500)
            setName('')
            setType('')
            setBreed('')
            setAge('')
            setDescription('')
            setImage('https://res.cloudinary.com/dke68lmlo/image/upload/v1567508001/pet-adoption/brak_zdjecia.png')
        } catch (error) {
            console.log(error)
        }
    }

    const fileUpload = async (files) => {
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'pet-adoption')
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dke68lmlo/image/upload', {
                method: 'POST',
                body: data
            })
            const file = await res.json()
            setImage(file.secure_url)
        } catch (error) {
            console.log(error)
        }
    }
    let checkShow = showPanel != 'addAnimal' ? 'none' : ''
    return(
        <Grid textAlign='center'>
            <Grid.Column style={{ maxWidth: 450}}>
                <Form style={{ marginTop: 50, display: checkShow}} onSubmit={handleAddAnimal} success={formSuccess}>
                    <Header as='h3' textAlign='center'>Dodaj Nowe Zwierze</Header>
                    <Form.Field required>
                        <label>Imię</label>
                        <input value={name} onChange={({ target }) => setName(target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        Rodzaj:
                    </Form.Field>
                    <Radio label='Pies' value='Pies' checked={type == 'Pies'} onChange={() => setType('Pies')} style={{ margin: '0px 10px 20px 10px'}} />
                    <Radio label='Kot' value='Kot' checked={type == 'Kot'} onChange={() => setType('Kot')} style={{ margin: '0px 10px 20px 10px'}} />  
                    <Form.Field  required>
                        <label>Rasa</label>
                        <input value={breed} onChange={({ target }) => setBreed(target.value)}/>
                    </Form.Field>
                    <Form.Field  required>
                        <label>Wiek</label>
                        <input value={age} onChange={({ target }) => setAge(target.value)}/>
                    </Form.Field>
                    <Form.TextArea required label='opis' value={description} onChange={({ target }) => setDescription(target.value)} />
                    <Form.Button content='Dodaj Zdjęcie' labelPosition='left' icon='file' onClick={() => fileInputRef.current.click()}/>
                    <input type='file' ref={fileInputRef} style={{ display: 'none'}} onChange={({ target }) => fileUpload(target.files)} />
                    <Image src={image} size='small' centered />
                    <Form.Button style={{marginTop: '20px'}} fluid type='submit' color='blue' size='large' loading={loading}>Dodaj</Form.Button>
                    <Message attached='bottom' success content='Zwierze zostało dodane' />
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default AddAnimal