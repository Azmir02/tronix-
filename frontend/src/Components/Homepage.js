import React from 'react'
import Navbars from './Navbars'
import Topbar from './Topbar'
import Footer from './layouts/Footer'
import Banner from './Banner'
import Newarrival from './Newarrival'
import Featured from './Featured'

const Homepage = () => {
  return (
   <>
    <Topbar></Topbar>
   <Navbars></Navbars>
   <Banner></Banner>
   {/*Newarraivale not fixed*/}
   <Newarrival></Newarrival>
   <Featured></Featured>
   <Footer></Footer>
   </>
  )
}

export default Homepage