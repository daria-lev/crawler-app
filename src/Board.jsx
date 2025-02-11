import { useEffect, useState } from 'react'
import './App.css'

function Tile(props) {
  const [type, setType] = useState("bgtile");

  function handleClick() {
    if (props.edit) {
      if (props.type == "bgtile") {
        //setType("wall");
        props.onChange(props.id[0], props.id[1], "wall")
      } else if (props.type == "wall") {
        //setType("bgtile");
        props.onChange(props.id[0], props.id[1], "bgtile")
      }
    }
  }

  return (
    <button
    className={props.type}
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
  const [pause, setPause] = useState(true)
  const [solver, setSolver] = useState([0, 0, 0, 1]) //i, j, ichange, jchange (which tile to look at)
  const [started, setStarted] = useState(false)
  let widthVal = types[0].length
  let heightVal = types.length
  //let onPause = pause
  //let solver = solverSave

  function childChange(i, j, type) {
    const update = [...types]
    update[i][j] = type
    setTypes(update)
    //console.log(types)
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if (!pause) {
        //setCount((oldCount) => oldCount+1)
        takeStep()
      }
    }, 250);
    return () => {clearInterval(timer)}
  }, [pause, started, solver, types]);

  function handleStartClick() {
    if (types[0][0] === "bgtile" && types[types.length-1][types[0].length-1] === "bgtile") {
      console.log("start click")
      setEditable(false)
      setPause(false)
      setSolver([0, 0, 0, 1])
      let newTypes = [...types]
      types[0][0] = "crawler"
      setTypes(newTypes)
      setStarted(false)
      //takeStep()
    }
    // run solver
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//Stick in useEffect?
//change algo to actually work

  function takeStep() {
    //console.log(onPause)
    if (!pause) {
      console.log(solver)
      let newX = solver[1] + solver[3] //horizontal in front of me
      let newY = solver[0] + solver[2] // vert in front of me
      let leftX = 1
      let leftY = 1
      if (solver[2] === 0) {
        leftX = solver[1] //unchanged
        leftY = solver[0] + solver[3]
      } else {
        leftX = solver[1] + (solver[2] * -1)
        leftY = solver[0] //unchanged
      }
      console.log("checking " + newY + " " + newX)
      console.log(newX < types[0].length)
      if (leftX >= 0 && leftX < types[0].length && leftY >= 0 && leftY < types.length && 
        types[leftY][leftX] !== "wall") { //TEMP: no wall to my left
          let newSolver = [...solver]
        if (newSolver[2] === 0) {
          newSolver[3] = 0
          newSolver[2] = solver[3]
        } else {
          newSolver[2] = 0
          newSolver[3] = solver[2] * -1
        }
        newSolver[0] = newSolver[0] + newSolver[2]
        newSolver[1] = newSolver[1] + newSolver[3]
        let newTypes = [...types]
        newTypes[solver[0]][solver[1]] = "seen"
        newTypes[newSolver[0]][newSolver[1]] = "crawler"
        //solver = newSolver
        setSolver(newSolver)
        setTypes(newTypes)
      }
      else if (newX < 0 || newX >= types[0].length || newY < 0 || newY >= types.length || 
            types[solver[0]+solver[2]][solver[1]+solver[3]] === "wall") {
        // wall in front of me; turn right
        console.log("turn")
        let newSolver = [...solver]
        if (newSolver[2] === 0) {
          newSolver[3] = 0
          newSolver[2] = solver[3] * -1
        } else {
          newSolver[2] = 0
          newSolver[3] = solver[2]
        }
        //solver = newSolver
        setSolver(newSolver)
      } else { 
        // wall or edge to my left, step forward
        console.log("move")
        let newTypes = [...types]
        newTypes[solver[0]][solver[1]] = "seen"
        newTypes[solver[0]+solver[2]][solver[1]+solver[3]] = "crawler"
        setSolver([solver[0]+solver[2], solver[1]+solver[3], solver[2], solver[3]])
        setTypes(newTypes)
      }

      setStarted(true)
      if (solver[0] === 0 && solver[1] === 0 && solver[2] === 0 && solver[3] === 1 && started) {
        console.log("at start")
        setPause(true) // back at start?
        setStarted(false)
      }
      else if (solver[0] === types.length-1 && solver[1] === types[0].length-1) {
        console.log("at end")
        setPause(true) // at end
        setStarted(false)
      }   
    }
  }

  function handleClearClick() {
    setEditable(true)
    setPause(true)
    setTypes(defaultTypes(types.length, types[0].length))
  }

  function handleClearSolverClick() {
    setEditable(true)
    setPause(true)
    setTypes(clearSolver())
  }

  function clearSolver() {
    let newTypes = [...types]
    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < types[0].length; j++) {
        if (newTypes[i][j] === "seen" || newTypes[i][j] === "crawler") {
          newTypes[i][j] = "bgtile"
        }
      }
    }
    return newTypes
  }

  function handlePauseClick() {
    setPause(true);
  }

  function handleContinueClick(){
    setEditable(true)
    setPause(false);
  }

  function createBoard() {
    //alert(props.clear)
    const board = []
    //console.log("rerender")
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
          //console.log(types)
        }
        setTypes(newTypes)
        
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
        <button className='buttonSet' onClick={handleClearSolverClick}>Clear Solver</button>
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