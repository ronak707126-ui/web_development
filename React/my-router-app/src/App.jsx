import React from "react";
import Home from "./HomePage";
import About from "./AboutPage";

//React-Router
import{BrowserRouter , Routes , Route} from 'react-router-dom'
function App(){


return(
<BrowserRouter>

<Routes>


  {/*  Path-Address of Different Pages */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />


</Routes>

</BrowserRouter>
)
}
export default App