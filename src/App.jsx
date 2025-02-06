import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Tile() {
  const [type, setType] = useState("bgtile");

  function handleClick() {
    if (type == "bgtile") {
      setType("wall");
    } else if (type == "wall") {
      setType("bgtile");
    }
  }

  return (
    <button
    className={type}
    onClick={handleClick}>
    </button>
  );
}

function Board(props) {
  //const [boardSize, setSize] = useState([props.height, props.width]) //height, width
  const [canEdit, setEditable] = useState(true)

  function createBoard() {
    const board = []
    for (var i = 0; i < props.height; i++) {
      const row = []
      for (var j = 0; j < props.width; j++) {
        row.push(<Tile></Tile>) 
      }
      board.push(<div>{row}</div>)
    }
    return board
  }

  return (
    <div>{createBoard()}</div>
  );

}

function App() {
  //const items = ["pear", "banana"]
  const [height, setHeight] = useState(5)
  const [width, setWidth] = useState(7)
  const [canEdit, setEditable] = useState(true)
  let widthVal = width
  let heightVal = height
  

  function handleSizeClick() {
    //alert(widthVal + " " + heightVal);
    if (widthVal > 0 && heightVal > 0 && heightVal < 10 && widthVal < 20) {
      setHeight(heightVal)
      setWidth(widthVal)
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

  }

  return (
    <>
      <div className="p-3">
        <label className='inputLabel'>Width:</label>
        <input type="number" min="1" step="1" onChange={e=>onWidthChange(e.target.value)} 
          defaultValue={width}></input> 
        <label className='inputLabel'>Height:</label>
        <input type="number" min="1" step="1" onChange={e=>onHeightChange(e.target.value)} 
          defaultValue={height}></input>
      </div>
      <button style={{margin: '10px'}} onClick={handleSizeClick}>Update Board Size</button>
      <div style={{margin: '20px'}}><Board height={height} width={width}></Board></div>
      <button style={{margin: '10px'}} onClick={handleStartClick}>Solve Maze</button>
    </>
  )
}

export default App
