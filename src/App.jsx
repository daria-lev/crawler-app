import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './Board'


function App() {
  //const items = ["pear", "banana"]
  

  return (
    <>
      <div className='text'>
        <h3 style={{fontSize: 15}}>
          Make a maze! The solver will spawn on the top left corner and try to make it to the 
          bottom right corner, so leave those open.
        </h3>
      </div>
      <div style={{margin: '20px'}}><Board>
        </Board>
      </div>
      
    </>
  )
}

export default App
