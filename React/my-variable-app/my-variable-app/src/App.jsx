//EXAMPLE - 1


//import React from "react";

// function App(){

//   let username = "ronak"

//   function Greet(){
//     alert(`Good Evening ${username}`)
//   }

//   return(
//     <>
//     <h2>MY Name is : {username}</h2>
//     <button onClick={Greet}>Greet</button>
//     </>



//   )
// }
// export default App




//EXAMPLE - 2  => VARIABLE VS REACT VARIABLE

// import React from "react";

// function App(){

//   let count = 10

  
// function IncreaseCount(){
//   count = count + 1;
//   console.log(count)
// }
  

//   return(
//     <>
//    <h2>Like/Cart/Quantity : {Count}</h2>
//    <button onClick={IncreaseCount}>Increase</button>
//     </>



//   )
// }
// export default App






//EXAMPLE - 3 
// React Variable - useState -(React Hooks)
// Special React Variable That Stores The Updated Value Along With It Also Updates The Screen automatically

// Syntax

// const[mainVariableName=screen , setVariableName-store update value] = useState(Initial Value)

// const[count setCount] = useState(10)
//--------------------------------------------------------------------------------------------------------------------------

// import React, {useState} from "react";

// function App(){

//   const[like, setLike] = useState(12)

  
// function IncreaseLike(){
//     setLike(like + 1)
//   console.log(like)
// }
  

//   return(
//     <>
//    <h2>Like/Cart/Quantity : {like}</h2>
//    <button onClick={IncreaseLike}>Increase</button>
//     </>



//   )
// }
// export default App






//EXAMPLE - 4 => T0 Show The password and to hide the password
import React, {useState} from "react";

function App(){

 const [show,setShow] = useState(false)


  return(

    <>
      <input type={show ? "text" : "password"} placeholder="Enter your password"/>   
      <button onClick={()=> setShow(!show)}>show/Hide</button>
    </>



  )
}
export default App
