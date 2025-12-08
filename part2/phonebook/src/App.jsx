import { useState, useEffect } from 'react'
import Contacts from "./components/contacts.jsx";
import SearchFilter from "./components/searchFilter.jsx";
import AddContact from "./components/addContact.jsx";
import contactService from './services/contacts'
import Notification from "./components/Notification.jsx";
import Error from "./components/error.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [searchText, setSearchText] = useState('')
    const [addMessage, setAddMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        console.log('effect')
        contactService
            .getAll()
            .then(initialContacts => {
                console.log("initial:", initialContacts)
                setPersons(initialContacts)
        })
    }, [] )

    console.log('render', persons.length, 'notes')


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
        }

        const match = persons.some(f => {
            if (f.name.toLowerCase() === newName.toLowerCase()){
                window.confirm(`${newName}, is already added to phonebook, replace the old number with a new one?`);
                updatePerson(persons.find(person => person.name === newName ? person.id : null).id)
                return true;
            }
            if (f.number === newPhone){
                window.alert(`${newPhone}, is already added to phonebook!`);
                return true;
            }
            return false;
        })

        if (!match){
            contactService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setAddMessage(`added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setAddMessage(null)
                    }, 5000)
                    setNewName('')
                    setNewPhone('')
                })
        }
    }

    const removePerson = (id) => {
        const person = persons.find(p => p.id ===id)
        if (window.confirm(`delete ${person.name}?`)){
            contactService
                .remove(id)
                .catch(error => {
                    setErrorMessage(`information of ${person.name} has already been removed from the server`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
            setPersons(persons.filter(p => p.id !== id))
        }
    }

    const updatePerson = (id) => {
        const person = persons.find(p => p.id === id)
        const changedPerson = {...person, number:newPhone}

        contactService
            .update(id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id === id ? returnedPerson : person))
                setAddMessage(`${returnedPerson.name}'s number has been changed`)
                setTimeout(() => {
                    setAddMessage(null)
                }, 5000)
            })
    }




    const contactsToShow = () => {
        console.log('search', searchText);
        if (searchText === ''){
            console.log('object sent', persons);
            return persons
        }
        else{
            return persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
        }
    }

    console.log('yuh', contactsToShow());

    return (
        <div>
            <h2>Phonebook</h2>
                <Notification message={addMessage}/>
                <Error message={errorMessage}/>
                <SearchFilter searchText={searchText} handleSearchChange={handleSearchChange}/>
            <h3>add new contact</h3>
                <AddContact addPerson={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
            <h3>Numbers</h3>
                <Contacts persons={contactsToShow()} onRemove={removePerson}/>
        </div>
    )
}

export default App