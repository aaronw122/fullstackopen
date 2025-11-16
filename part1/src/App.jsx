import { useState } from 'react'

const Button = ({text, onClick}) => {

    return(
        <button onClick={onClick}> {text} </button>
    )
}

const Highest = ({highest, quote, votes}) => {
        return (highest !== 0) ? (
            <div>
                <p>{quote}</p>
                <p>{votes} votes</p>
            </div>
        ) :
        null

};

const App = () => {
    let prevAnecdotes = [
        {
            quote: 'If it hurts, do it more often.',
            votes: 0
        },
        {
            quote: 'Adding manpower to a late software project makes it later!',
            votes: 0
        },
        {
            quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            votes: 0
        },
        {
            quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            votes: 0
        },
        {
            quote: 'Premature optimization is the root of all evil.',
            votes: 0
        },
        {
            quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
            votes: 0
        },
        {
            quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
            votes: 0
        },
        {
            quote: 'The only way to go fast, is to go well.',
            votes: 0
        },
    ]

    const [selected, setSelected] = useState(0);

    const [anecdotes, setAnecdotes] = useState(prevAnecdotes);

    const [highest, setHighest] = useState(0);

    const randomize = () => setSelected(Math.floor(Math.random() * anecdotes.length));

    const vote = () => {
            const copy = [...anecdotes];
            copy[selected] = {
                ...copy[selected],
                votes: copy[selected].votes + 1,
            };
            setAnecdotes(copy);
            highestVote(copy);
    }


    const highestVote = (copy) => {
        let best = 0;
        let bestIndex = 0;

        for (let i in copy){
            if (copy[i].votes >= best) {
                console.log(copy[i].votes)
                bestIndex = i;
                best = copy[i].votes
                console.log('best index:', bestIndex);
            }
        }
        setHighest(bestIndex);
    };

    return (
        <div>
            <h2>anecdotes of the day</h2>
            <p>{anecdotes[selected].quote}</p>
            <p> {anecdotes[selected].votes} votes</p>
            <Button text='random anecdote' onClick={randomize}/>
            <Button text='vote' onClick={vote}/>
            <h2>anecdote with the most votes</h2>
            <Highest highest={highest} quote={anecdotes[highest].quote} votes={anecdotes[highest].votes}/>
        </div>
    )
};

export default App