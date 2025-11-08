const Header = ({course}) => {
    return(
        <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
    return(
        parts.map(p => (
            <p key={p.name}> {p.name} {p.exercises} </p>
        ))
    )
}

const Total = ({parts}) => {

    let sum = 0;

    for (const part of parts){
        sum += part.exercises;
    }
    return(
        <p>Number of exercises: {sum} </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default App