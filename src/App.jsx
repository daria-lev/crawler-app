import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './Board'


function App() {
  //const items = ["pear", "banana"]
  const [size, setSize] = useState([5,7])
  const [canEdit, setEditable] = useState(true)
  const [clear, setClear] = useState(false)
  let widthVal = size[1]
  let heightVal = size[0]
  let doClear = false
  

  function handleSizeClick() {
    //alert(widthVal + " " + heightVal);
    if (widthVal >= 4 && heightVal >= 3 && heightVal <= 10 && widthVal <= 20) {
      let sizeVal = [heightVal, widthVal]
      setSize(sizeVal)
    } else {
      alert("invalid")
    }
  }

  function onWidthChange(e){
    let val = parseInt(e)
    //alert(val)
    widthVal = val;
  }

  function onHeightChange(e) {
    let val = parseInt(e)
    //alert(val)
    heightVal = val;
  }

  function handleStartClick() {
    setEditable(false);
  }

  function handleClearClick() {
    // doClear = true
    // setClear(true)
    // doClear = false
    // setClear(false)
    // //doClear = false
    // //setClear(false)
  }

  function handlePauseClick() {
    setClear(false)
  }

  function handleContinueClick(){
    //temp
    setEditable(true)
  }

  return (
    <>
      <div className='text'>
        <h3 style={{fontSize: 15}}>
          Make a maze! The solver will spawn on the top left corner and try to make it to the 
          bottom right corner, so leave those open.
        </h3>
      </div>
      <button className='buttonSet' onClick={handleStartClick}>Solve Maze</button>
      <button className='buttonSet' onClick={handlePauseClick}>Pause</button>
      <button className='buttonSet' onClick={handleContinueClick}>Continue</button>
      <button className='buttonSet' onClick={handleClearClick}>Clear Board</button>
      <div style={{margin: '20px'}}><Board height={size[0]} width={size[1]} edit={canEdit} clear={false}>
        </Board>
      </div>
      <div className="p-3">
        <label className='inputLabel'>Width:</label>
        <input type="number" min="4" step="1" onChange={e=>onWidthChange(e.target.value)} 
          defaultValue={size[1]}></input> 
        <label className='inputLabel'>Height:</label>
        <input type="number" min="3" step="1" onChange={e=>onHeightChange(e.target.value)} 
          defaultValue={size[0]}></input>
      </div>
      <button style={{margin: '10px'}} onClick={handleSizeClick}>Update Board Size</button>
      
    </>
  )
}

export default App
