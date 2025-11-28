import { useState } from 'react'
import Contacts from "../components/contacts.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [searchText, setSearchText] = useState('')

    console.log('search', searchText);


    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearchText(event.target.value)
    }

    console.log('length:', persons.length)


    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newPhone,
            id: persons.length + 1
        }

        const match = persons.some(f => {
            if (f.name === newName){
                window.alert(`${newName}, is already added to phonebook!`);
                return true;
            }
            if (f.number === newPhone){
                window.alert(`${newPhone}, is already added to phonebook!`);
                return true;
            }
            return false;
        })

        if (!match){
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewPhone('')
            console.log('newname', newName)
        }
    }

    const contactsToShow = () => {
        console.log('search', searchText);
        if (searchText === ''){
            console.log('object sent', persons);
            return(
                persons
            )
        }
        else{
            return persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
        }
    }

    console.log('yuh', contactsToShow());

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with:<input value={searchText} onChange={handleSearchChange}/>
            </div>
            <h3>add new contact</h3>
                <form onSubmit={addPerson}>
                    <div>
                        name: <input value={newName} onChange={handleNameChange}/>
                    </div>
                    <div>
                        phone: <input value={newPhone} onChange={handlePhoneChange}/>
                    </div>
                    <div>
                        <button type="submit">add</button>
                    </div>
                </form>
            <h3>Numbers</h3>
                <Contacts persons={contactsToShow()}/>
        </div>
    )
}

export default App