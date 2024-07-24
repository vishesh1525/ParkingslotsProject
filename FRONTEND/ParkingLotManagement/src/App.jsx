import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-800">
      <> 
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <h1 className='bg-green-600'>Vishesh P gowda</h1>  
    </>
    </div>
    
  )
}

export default App
