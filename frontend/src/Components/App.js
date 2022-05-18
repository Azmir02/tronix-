import Homepage from "./Homepage";
import {Routes,Route,} from "react-router-dom";
// import { BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope ,BsSearch,BsBag} from "react-icons/bs";
import Productpage from "./Productpages/Productpage";
import Productdetails from "./Productpages/Productdetails";
import Productlist from "./Productpages/Productlist";
import Cartpage from "./Cartpage";
import About from "./About";
import Serchpage from "./layouts/Serchpage";




function App() {
  return (
   <>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/api/products/all" element={<Productpage/>}></Route>
          <Route path="/api/products" element={<Productlist/>}></Route>
          <Route path="/api/products/:slug" element={<Productdetails/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/catalog" element={<Serchpage/>}></Route>
          <Route path="/cartpage" element={<Cartpage/>}></Route>
        </Routes>
   </>
  );
}

export default App;
