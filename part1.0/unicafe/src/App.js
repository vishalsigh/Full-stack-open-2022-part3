import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100

  if (all === 0){
    return <p>No feedback given</p>
  }

  return (
    <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={all}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive}/>
        </tbody>
      </table>
  
    )
}

const Button = ({title,handleClick}) => {
  return (
    <button onClick={handleClick}>{title}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick =() => {
    setGood(good+1)
  }

  const handleNeutralClick =() => {
    setNeutral(neutral+1)
  }

  const handleBadClick =() => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button title='good' handleClick={handleGoodClick} />
      <Button title='neutal' handleClick={handleNeutralClick} />
      <Button title='bad' handleClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App