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

class BoardMaybe extends React.Component {
  constructor(props) {
    super(props);
    this.reset();
  }

  reset() {
    this.state = {
      boardSize: [5,7]
    };
  }

  createBoard() {
    const board = []
    for (var i = 0; i < boardSize[0]; i++) {
      const row = []
      for (var j = 0; j < boardSize[1]; j++) {
        row.push(<Tile></Tile>) 
      }
      board.push(<div>{row}</div>)
    }
    return board
  }

  render() {
    return(
      <div>{createBoard()}</div>
    ); 
  }
}

function Board() {
  const [boardSize, setSize] = useState([5,7]) //height, width
  const canEdit = true

  function createBoard() {
    const board = []
    for (var i = 0; i < boardSize[0]; i++) {
      const row = []
      for (var j = 0; j < boardSize[1]; j++) {
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
  const [height, setHeight] = useState("")
  const [width, setWidth] = useState("")
  

  function handleSizeClick() {
    alert("change board size");
  }

  function onWidthChange(){
    setWidth()
  }

  function onHeightChange() {
    
  }

  function handleTileClick() {
    if (canEdit) {

    }
  } 

  return (
    <>
      <div className="p-3">
        <label className='inputLabel'>Width:</label>
        <input type="number" onChange={onWidthChange}></input> 
        <label className='inputLabel'>Height:</label>
        <input type="number" onChange={onHeightChange}></input>
      </div>
      <button style={{margin: '10px'}} onClick={handleSizeClick}>Update Board Size</button>
      <div style={{margin: '20px'}}><Board></Board></div>
      
    </>
  )
}

export default App
