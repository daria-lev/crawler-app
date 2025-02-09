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
        props.onChange(props.id[0], props.id[1], "wall")
      } else if (type == "wall") {
        setType("bgtile");
        props.onChange(props.id[0], props.id[1], "bgtile")
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

function Board() {
  //const [boardSize, setSize] = useState([props.height, props.width]) //height, width
  //const [canEdit, setEditable] = useState(true)
  //const [size, setSize] = useState([5,7])
  const [canEdit, setEditable] = useState(true)
  const [types, setTypes] = useState(defaultTypes(5, 7))
  let widthVal = types[0].length
  let heightVal = types.length

  function childChange(i, j, type) {
    const update = [...types]
    update[i][j] = type
    setTypes(update)
    console.log(types)
  }

  function handleStartClick() {
    setEditable(false)
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
    //setClear(false)
  }

  function handleContinueClick(){
    //temp
    setEditable(true)
  }

  function createBoard() {
    //alert(props.clear)
    const board = []
    //const tileHeight = boardSize[0] / props.height;
    //const tileWidth = boardSize[1] / props.width;
    for (var i = 0; i < types.length; i++) {
      const row = []
      for (var j = 0; j < types[0].length; j++) {
        row.push(<Tile type={types[i][j]} edit={canEdit} reset={""} id={[i,j]} 
                  onChange={childChange}></Tile>)
      }
      board.push(<div>{row}</div>)
    }
    return board
  }

  function defaultTypes(x, y) {
    let arr = []
    for (let i = 0; i < x; i++) {
      let row = []
      for (let j = 0; j < y; j++) {
        row.push("bgtile")
      }
      arr.push(row)
    }
    return arr
  }
  

  function handleSizeClick() {
    //alert(widthVal + " " + heightVal);
    if (canEdit) {
      if (widthVal >= 4 && heightVal >= 3 && heightVal <= 10 && widthVal <= 20) {
        // let sizeVal = [heightVal, widthVal]
        // setSize(sizeVal)
        let newTypes = []
        for (let i = 0; i < heightVal; i++) {
          let row = []
          for (let j = 0; j < widthVal; j++) {
            if (i >= types.length || j >= types[0].length) {
              row.push("bgtile")
            } else {
              row.push(types[i][j])
            }
          }
          newTypes.push(row)
          setTypes(newTypes)
          console.log(types)
        }
        
      } else {
        alert("invalid")
      }
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

  return (
    <div>
      <div>
        <button className='buttonSet' onClick={handleStartClick}>Solve Maze</button>
        <button className='buttonSet' onClick={handlePauseClick}>Pause</button>
        <button className='buttonSet' onClick={handleContinueClick}>Continue</button>
        <button className='buttonSet' onClick={handleClearClick}>Clear Board</button>
      </div>
      {createBoard()}
      <div className="p-3">
        <label className='inputLabel'>Width:</label>
        <input type="number" min="4" step="1" onChange={e=>onWidthChange(e.target.value)} 
          defaultValue={types[0].length}></input> 
        <label className='inputLabel'>Height:</label>
        <input type="number" min="3" step="1" onChange={e=>onHeightChange(e.target.value)} 
          defaultValue={types.length}></input>
      </div>
      <button style={{margin: '10px'}} onClick={handleSizeClick}>Update Board Size</button>
    </div>
  );

}

export default Board