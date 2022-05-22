import { useContext ,useState,useReducer,useEffect} from 'react';
import Homepage from "./Homepage";
import {Routes,Route, useNavigate,} from "react-router-dom";
import Productpage from "./Productpages/Productpage";
import Productdetails from "./Productpages/Productdetails";
import Productlist from "./Productpages/Productlist";
import Cartpage from "./Cartpage";
import About from "./About";
import Serchpage from "./layouts/Serchpage";
import Login from "./Login";
import { Store } from './Store';
import Signup from "./Signup";




function App() {
  const {state,dispatch3,state4} = useContext(Store)
  const {userInfo} = state4
  const navigate = useNavigate()


  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }
  },[])



  return (
   <>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/api/products/all" element={<Productpage/>}></Route>
          <Route path="/api/products" element={<Productlist/>}></Route>
          <Route path="/api/products/name/:slug" element={<Productdetails/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/signin" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/catalog" element={<Serchpage/>}></Route>
          <Route path="/cartpage" element={<Cartpage/>}></Route>
        </Routes>
   </>
  );
}

export default App;
