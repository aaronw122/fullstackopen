import { useState } from 'react'

const Counter = ({counter}) => {
    return(
        <div>
            {counter}
        </div>
    )
}

const Button = ({text, handleClick}) => {
    return(
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const App = () => {
    const [ counter, setCounter ] = useState(0)
    console.log('rendering with counter value', counter)

    const zeroButtonVisible = (counter >= 1) || (counter < 0)

    const incrementByOne = () => {
        setCounter(counter + 1)
        console.log('increasing, value before', counter)

    }

    const decreaseByOne = () => setCounter(counter - 1)


    const setToZero = () => {
        setCounter(0)
        console.log('decreasing, value before', counter)

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