//EXAMPLE - 1

// import React from "react";

// function App(){

//  function handleClick(){
//   alert("Godd Evening Welcome To React")
//  }


//   return(
//   <>
//   <button onClick={handleClick}>Click me</button>
//   </>



//   )
// }
// export default App




//EXAMPLE - 2  ( follow/following )

// import React from "react";
// import {useState} from "react";

// function App(){

// const [isFollow , setIsFollowed] = useState(false)
//   return(
//   <>
//   <button onClick={()=>setIsFollowed(!isFollow)}>
//     {isFollow ? "following":"follow" }
//   </button>
//   </>
//   )
// }
// export default 




//EXAMPLE - 3 

import React from "react";
import { useState } from "react";

function App(){

  const [text,setText] = useState("")

  return(
  <>
  <input
  type="text"
  placeholder="Search..."
  onChange={(e)=> setText(e.target.value)}

  />

    <h3>You Typed :{text}</h3>
  </>
  )
}
export default App