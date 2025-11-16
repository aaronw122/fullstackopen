import { useState } from 'react'


const FeedbackScore = ({positive}) => {
    let stringPos = null;

    if (positive != null) {
        stringPos = positive.toString() + '%'
    }
    return(
        <div>positive feedback: {stringPos}</div>
    )
}

const StatisticLine = ({text, stat}) => <div>{text}: {stat} </div>;

const Stats = ({bad, good, neutral}) => {

    let total = bad + good + neutral;

    let average = (good + (bad * (-1))) / total

    let positive = (good / total) * 100

    return (total >= 1) ? (
        <div>
            <table>
                <colgroup>
                    <col span="2"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col"></th>
                    </tr>
                </thead>
            </table>
            <StatisticLine text='good' stat={good}/>
            <StatisticLine text='neutral' stat={neutral}/>
            <StatisticLine text='bad' stat={bad}/>
            <StatisticLine text='total responses' stat={total}/>
            <FeedbackScore positive={positive}/>
            <StatisticLine text='average' stat={average}/>
        </div>
    ):
    (
        <div>
            no feedback given
        </div>
    )
}

const Header = ({text}) => <h1>{text}</h1>;

const Button = (props) => {
    const { onClick, text } = props
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)


    const handleGoodClick = () => {
        console.log('good before', good)
        setGood(good + 1)
        setTotal(total+1)
    }
    const handleNeutralClick = () => {
        console.log('neutral before', neutral)
        setNeutral(neutral + 1)
        setTotal(total+1)
    }
    const handleBadClick = () => {
        console.log('bad before', bad)
        setBad(bad+1)
        setTotal(total+1)
    }

    return (
        <div>
            <Header text='give feedback'/>
            <Button onClick={handleGoodClick} text='good'/>
            <Button onClick={handleNeutralClick} text='neutral'/>
            <Button onClick={handleBadClick} text='bad'/>
            <Header text='statistics'/>
            <Stats good={good} neutral={neutral} bad={bad} total={total}/>
        </div>
    )
}

export default App