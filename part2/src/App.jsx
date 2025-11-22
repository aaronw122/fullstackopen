import { useState } from 'react'
import Note from '../components/Note'




const App = ({notes}) => {
    return (
        <div>
            <h1>Notes</h1>
            <Note notes={notes}/>
        </div>
    )
}

export default App
