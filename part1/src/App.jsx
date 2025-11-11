import { useState } from 'react'

const Counter = ({counter}) => <div> {counter} </div>


const Button = ({text, handleClick}) => <button onClick={handleClick}> {text} </button>

const App = () => {
    const [ counter, setCounter ] = useState(0)
    console.log('rendering with counter value', counter)

    const zeroButtonVisible = (counter >= 1) || (counter < 0)

    const incrementByOne = () => {
        console.log('increasing, value before', counter)
        setCounter(counter + 1)
    }

    const decreaseByOne = () => {
        console.log('decreasing, value before', counter)
        setCounter(counter - 1)
    }


    const setToZero = () => {
        console.log('resetting to zero, value before', counter)
        setCounter(0)


    }

    return (
        <div>
            <Counter counter={counter}/>
            <Button text='plus' handleClick={incrementByOne}/>
            <Button text='minus' handleClick={decreaseByOne}/>
            {zeroButtonVisible ?
            <Button text='zero' handleClick={setToZero}/>
                : null}
        </div>
    )
}

export default App