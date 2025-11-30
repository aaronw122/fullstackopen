const Contacts = ({persons, onRemove}) => {
    console.log('type', typeof persons)
    return (
        <div>
            {persons.map((person) => (
                <p key={person.id}>{person.name} {person.number} <button onClick={() => onRemove(person.id)}> remove</button></p>
            ))
            }
        </div>
    )
}

export default Contacts

