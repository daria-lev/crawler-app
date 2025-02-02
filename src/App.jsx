import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Tile() {

  function handleClick() {
    alert("clicked");
  }

  return (
    <button
    className="tile"
    onClick={handleClick}>
    </button>
  );
}

function Board() {
  const boardSize = [5, 7] //height, width
  const canEdit = true

  function createBoard() {
    const board = []
    for (var i = 0; i < boardSize[0]; i++) {
      const row = []
      for (var j = 0; j < boardSize[1]; j++) {
        row.push(<Tile></Tile>) // temporary, will have buttons?
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
  const items = ["pear", "banana"]
  

  function handleSizeClick() {
    alert("change board size");
  }

  function handleTileClick() {
    if (canEdit) {

    }
  }

  

  return (
    <>
      <button onClick={handleSizeClick}>Update Board Size</button>
      <div>
        <h1>Hello!</h1>
      </div>
      <Board></Board>
    </>
  )
}

export default App
