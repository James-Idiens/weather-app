import { useState, useEffect } from 'react'
import { getGreeting } from '../apiClient'

const App = () => {
  const [greeting, setGreeting] = useState('')
  const [count, setCount] = useState(0)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    getGreeting()
      .then((greeting) => {
        console.log(greeting)
        setGreeting(greeting)
        setIsError(false)
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
      })
  }, [count])

  return (
    <>
      {count}
      <h1>{greeting}</h1>
      {isError && (
        <p className="text-3xl font-bold text-red-500 underline text-center">
          There was an error retrieving the greeting.
        </p>
      )}
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  )
}

export default App
