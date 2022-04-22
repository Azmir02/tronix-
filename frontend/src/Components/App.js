import Homepage from "./Homepage";
import {Routes,Route,} from "react-router-dom";
import { BsInstagram,BsFacebook,BsTwitter,BsLinkedin,BsTelephone,BsEnvelope ,BsSearch,BsBag} from "react-icons/bs";
import Productpage from "./Productpages/Productpage";
import Productdetails from "./Productpages/Productdetails";




function App() {
  return (
   <>

   {/* <Container>
   <Mainbar>
                <Row>
                    <Col lg = {6}>
                        <Topbarstyle>
                            <div className="left-bar">
                                <a href="#"><BsInstagram></BsInstagram></a>
                                <a href="#"><BsFacebook></BsFacebook></a>
                                <a href="#"><BsTwitter></BsTwitter></a>
                                <a href="#"><BsLinkedin></BsLinkedin></a>
                            </div>
                        </Topbarstyle>
                    </Col>
                    <Col lg = {6}>
                        <Topbarstyle>
                            <div className="right-bar text-end">
                                <a href="#"><BsTelephone></BsTelephone> <span>+12 345 6789 0</span></a>
                                <a href="#"><BsEnvelope></BsEnvelope> <span>support@tronix.com</span></a>
                            </div>
                        </Topbarstyle>
                    </Col>
                </Row>
            </Mainbar>
   </Container> */}
   



        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/api/products/all" element={<Productpage/>}></Route>
          <Route path="/api/products/:slug" element={<Productdetails/>}></Route>
        </Routes>
   </>
  );
}

export default App;
