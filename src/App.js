import { useState } from "react";
import Navbar from "./Navbar"
export default function Board() {
  const x = Math.floor(Math.random()*4)
  const y = Math.floor(Math.random()*4)
  const [player,setPlayer] = useState("guest")
  const [signedIn, setSignedIn] = useState(false)
  const [squareData, SetSquareData] = useState([[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]])
  
  //const [gameOver,]
  // function newGameHandler(){
  //   spawnNum(mtx)
  //   spawnNum(mtx)
  // }
  
  function spawnNum(mtx){
    let x = Math.random()
    let num 
    if (x<0.8){
      num = 2
    }
    else{
      num = 4
    }
    let arr = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++){
        if (mtx[i][j] == null){
          arr.push([i,j])
        }
      }
  }
    let b = Math.floor(Math.random()*arr.length)
    if (arr.length>0){
    mtx[arr[b][0]][arr[b][1]] = num}
}
  function moveHandler(event) {
    
    let newSquares = squareData.slice()
    if (event.key == 'd') {

      moveRight(newSquares)

    }
    else if (event.key == 'a') {
      for (let row of newSquares) {
        row.reverse()
      }
      moveRight(newSquares)
      for (let row of newSquares) {
        row.reverse()
      }
    }
    else if (event.key == 's') {
      unRotateMatrix(newSquares)
      moveRight(newSquares)
      rotateMatrix(newSquares)
    }
    else if (event.key == 'w') {
      rotateMatrix(newSquares)
      moveRight(newSquares)
      unRotateMatrix(newSquares)
    }
    spawnNum(newSquares)
    SetSquareData(newSquares)
    
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": player,
  "board": newSquares
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/updateboard", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  



  function clickHandler(e){
    e.preventDefault()

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": e.target.name.value,
  "password": e.target.password.value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/login", requestOptions)
  .then(response => response.text())
  .then(result => {
    const nResult = JSON.parse(result)
    if (result!==false){
      setSignedIn(true)
      setPlayer(e.target.name.value)
      SetSquareData(nResult.board)
    }
    

  }
  )
  .catch(error => console.log('error', error));

    // var requestOptions = {
    //   method: 'GET',
    //   redirect: 'follow'
    // };
    
    // fetch("http://localhost:8080/items", requestOptions)
    //   .then(response => response.text())
    //   .then(stuff => {
    //     const newStuff = JSON.parse(stuff)
    //     const uname = e.target.name.value
    //     const pword = e.target.password.value
    //     console.log(typeof(newStuff))
    //     console.log(uname,pword)
    //     console.log(newStuff.username,newStuff.password)
    //     if ((newStuff.username == uname) & newStuff.password == pword){
          
    //       setPlayer(uname); setSignedIn(true);
    //     }
    //     else{
  
    //       console.log('invalid')
    //     }
    //   })
    //   .catch(error => console.log('error', error));
  
    
  }
  // function signOutHandler(){
  function signOut (){
    setPlayer('guest')
    setSignedIn(false)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/guest", requestOptions)
      .then(response => response.text())
      .then(result => {
        const nResult = JSON.parse(result)
        SetSquareData(nResult.board)
      })
      .catch(error => console.log('error', error));
    
    
    
  //SetSquareData(result)
}
  
  
  // }
  function Header(){
    if (signedIn){
      return(
        <h1>{player}</h1>
      )
    } else
    {return(
    <>
      <h1>{player}</h1>
      <form onSubmit = {e => clickHandler(e)}>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Password:
    <input type = "text" name = "password"/>
  </label>
  <input type="submit" value="Submit" />
</form>
</>)
    }}
  
  return (
    <>
    <Navbar />
    <Header></Header>
    {/* <div> */}
      {/* <GameStatus></GameStatus> */}
      {/* <button onClick={newGameHandler}>New Game</button></div> */}
      <div className="board-row">
        
        <div className="square">{squareData[0][0]}</div>
        <div className="square">{squareData[0][1]}</div>
        <div className="square">{squareData[0][2]}</div>
        <div className="square">{squareData[0][3]}</div>
      </div>
      <div className="board-row">
        <div className="square">{squareData[1][0]}</div>
        <div className="square">{squareData[1][1]}</div>
        <div className="square">{squareData[1][2]}</div>
        <div className="square">{squareData[1][3]}</div>
      </div>
      <div className="board-row">
        <div className="square">{squareData[2][0]}</div>
        <div className="square">{squareData[2][1]}</div>
        <div className="square">{squareData[2][2]}</div>
        <div className="square">{squareData[2][3]}</div>
      </div>
      <div className="board-row">
        <div className="square">{squareData[3][0]}</div>
        <div className="square">{squareData[3][1]}</div>
        <div className="square">{squareData[3][2]}</div>
        <div className="square">{squareData[3][3]}</div>

       
         <button onClick = {signOut}>Sign Out</button>
        

      </div>
      <div>
        
      <input onKeyDown={e => moveHandler(e)}></input>
      
      </div>
    </>
  );
}







function moveRight(z) {
  for (let mygame of z) {
    //rev = mygame.slice().reverse()
    let zero_count = 0
    for (let i = 3; i >= 0; i--) {
      if (mygame[i] == null) {
        zero_count += 1
      }
      else {
        if (zero_count > 0) {
          mygame[i + zero_count] = mygame[i]
          mygame[i] = null
        }
      }
    }
    if (zero_count == 2 && mygame[2] == mygame[3]) {
      mygame[3] += mygame[2]
      mygame[2] = null
    }

    if (zero_count == 1) {
      if (mygame[2] == mygame[3]) {
        mygame[3] += mygame[2]
        mygame[2] = mygame[1]
        mygame[1] = null
      }
      else {
        if (mygame[1] == mygame[2]) {
          mygame[2] += mygame[1]
          mygame[1] = null
        }
      }
    }
    if (zero_count == 0) {
      if (mygame[3] == mygame[2]) {
        if (mygame[0] == mygame[1]) {
          mygame[3] += mygame[2]
          mygame[2] = mygame[0] + mygame[1]
          mygame[0] = null
          mygame[1] = null
        }

        else {
          mygame[3] += mygame[2]
          mygame[2] = mygame[1]
          mygame[1] = mygame[0]
          mygame[0] = null
        }
      }
      else {
        if (mygame[1] == mygame[2]) {
          mygame[2] += mygame[1]
          mygame[1] = mygame[0]
          mygame[0] = null
        }
        else {
          if (mygame[0] == mygame[1]) {
            mygame[1] += mygame[0]
            mygame[0] = null
          }
        }
      }
    }

  }
}
function rotateMatrix(mtx) {


  // newMatrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  //let copymtx = mtx.slice()
  mtx.reverse()
  //flippedMat = mtx[::-1]
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      [mtx[i][j], mtx[j][i]] = [mtx[j][i], mtx[i][j]]
    }
  }

  //return (mtx)
}
function unRotateMatrix(mtx) {
  //let copymtx = mtx.slice()
  mtx.reverse()

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3 - i; j++) {
      [mtx[i][j], mtx[3 - j][3 - i]] = [mtx[3 - j][3 - i], mtx[i][j]]
    }
  }

  //return (mtx)
}
function calculateGameOver(mtx) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; i++) {
      if (i == 3) {

      }
      if (mtx[i][j] == null || mtx[i][j] == mtx[i][j + 1] || mtx[i][j] == mtx[i + 1][j])
        return false
    }
  }
}


// function GameStatus() {
//   if (calculateGameOver){
//     return(
//       <div>Game Over. Final Score {score}</div>
      
//     )
//   }
//   else{
//     return (
//       <div>Current Score: {score}</div>
//     )
//   }
// }