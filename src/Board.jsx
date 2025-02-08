import { useEffect, useState } from 'react'
import './App.css'

function Tile(props) {
  const [type, setType] = useState("bgtile");

  // useEffect(() => {
  //   //alert("use effect")
  //   if (props.reset) {
  //     setType("bgtile");
  //     //alert("reset")
  //   }
  // });

  function handleClick() {
    if (props.edit) {
      if (type == "bgtile") {
        setType("wall");
      } else if (type == "wall") {
        setType("bgtile");
      }
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
  //const [canEdit, setEditable] = useState(true)
  const boardSize = [250, 500] //height, width in pix

  function createBoard() {
    //alert(props.clear)
    const board = []
    //const tileHeight = boardSize[0] / props.height;
    //const tileWidth = boardSize[1] / props.width;
    for (var i = 0; i < props.height; i++) {
      const row = []
      for (var j = 0; j < props.width; j++) {
        row.push(<Tile edit={props.edit} reset={props.clear}></Tile>)
      }
      board.push(<div>{row}</div>)
    }
    return board
  }

  return (
    <div>{createBoard()}</div>
  );

}

export default Board