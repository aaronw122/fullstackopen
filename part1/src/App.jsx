import { useState } from 'react'


const FeedbackScore = ({positive}) => {
    let stringPos = null;

    if (positive != null) {
        stringPos = positive.toString() + '%'
    }
    return(
        <td>{stringPos}</td>
    )
}

const StatisticLine = ({text, stat}) => <div>{text}: {stat} </div>;

const Stats = ({bad, good, neutral}) => {

    let total = bad + good + neutral;

    let average = Number((good + (bad * (-1))) / total).toFixed(2);

    let positive = Number((good / total) * 100).toFixed(1);

    return (total >= 1) ? (
        <table>
            <colgroup>
                <col span="2"/>
            </colgroup>
            <tbody>
                <tr>
                    <td>good</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td>
                    <td>{total}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <FeedbackScore positive={positive}/>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
            </tbody>
        </table>
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
        setGood(good + 1)
        setTotal(total+1)
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setTotal(total+1)
    }
    const handleBadClick = () => {
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