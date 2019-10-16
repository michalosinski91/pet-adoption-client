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
    const [errorMessage, setErrorMessage] = useState(null)
    const [nameValid, setNameValid] = useState(false)
    const [breedValid, setBreedValid] = useState(false)
    const [ageValid, setAgeValid] = useState(false)

    const fileInputRef = useRef()

    const [addAnimal, { loading }] = useMutation(ADD_ANIMAL)

    const createFileInputRef = event => {
        event.preventDefault()
        fileInputRef.current.click()
    }

    const checkName = arg => {
        const re = /^(\w+ ?)*$/i
        setNameValid(re.test(name))
    }
    const checkBreed = arg => {
        const re = /^(\w+ ?)*$/i
        setBreedValid(re.test(breed))
    }
    const checkAge = arg => {
        const re = /[0-9]/
        setAgeValid(re.test(Number(age)))
    }

    const handleAddAnimal = async (event) => {
        event.preventDefault()
        if (name.length < 2) {
        setErrorMessage('Imię jest za krótkie - powinno zawierać co najmniej 2 litery')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (name.length > 20) {
        setErrorMessage('Imię jest za długie - powinno zawierać co najwyżej 20 liter')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (age.length < 1) {
            setErrorMessage('Proszę podać wiek')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (type.length < 1) {
            setErrorMessage('Proszę wybrać typ zwierzęcia')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (breed.length < 1) {
            setErrorMessage('Proszę podać rasę')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (!nameValid) {
            setErrorMessage('Wprowadzone imię nie spełnia wymogów')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (!breedValid) {
            setErrorMessage('Wprowadzona rasa nie spełnia wymogów')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
        if (!ageValid) {
            setErrorMessage('Wprowadzony wiek nie spełnia wymogów')
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
            return
        }
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

    const fileUpload = async event => {
        event.preventDefault()
        const data = new FormData();
        data.append('file', event.target.files[0])
        data.append('upload_preset', 'pet-adoption')
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dke68lmlo/image/upload', {
                method: 'POST',
                body: data
            })
            const file = await res.json()
            setImage(file.secure_url)
        } catch (error) {
                setErrorMessage('Wystąpił błąd podczas operacjii dodania zwierzęcia. Proszę spróbować ponownie.')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 6000)
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
                        <input value={name} onChange={({ target }) => {
                            setName(target.value)
                            checkName(target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        Rodzaj
                    </Form.Field>
                    <Radio label='Pies' value='Pies' checked={type == 'Pies'} onChange={() => setType('Pies')} style={{ margin: '0px 10px 20px 10px'}} />
                    <Radio label='Kot' value='Kot' checked={type == 'Kot'} onChange={() => setType('Kot')} style={{ margin: '0px 10px 20px 10px'}} />  
                    <Form.Field  required>
                        <label>Rasa</label>
                        <input value={breed} onChange={({ target }) => {
                            setBreed(target.value)
                            checkBreed(target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field  required>
                        <label>Wiek (w latach)</label>
                        <input value={age} onChange={({ target }) => {
                            setAge(target.value)
                            checkAge(target.value)
                        }}/>
                    </Form.Field>
                    <Form.TextArea label='opis' value={description} onChange={({ target }) => setDescription(target.value)} />
                    <Form.Button content='Dodaj Zdjęcie' labelPosition='left' icon='file' onClick={createFileInputRef}/>
                    <input type='file' ref={fileInputRef} style={{ display: 'none'}} onChange={fileUpload} />
                    <Image src={image} size='small' centered />
                    <Form.Button style={{marginTop: '20px'}} fluid type='submit' color='blue' size='large' loading={loading}>Dodaj</Form.Button>
                    {errorMessage &&
                        <Message negative>
                            {errorMessage}
                        </Message>
                    }
                    <Message attached='bottom' success content='Zwierze zostało dodane' />
                </Form>
            </Grid.Column>
        </Grid>
    )
}

export default AddAnimal