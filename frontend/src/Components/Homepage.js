import React from 'react'
import Navbars from './Navbars'
import Topbar from './Topbar'
import Footer from './layouts/Footer'
import Banner from './Banner'
import Newarrival from './Newarrival'
import Featured from './Featured'
import { Collection } from './Collection'

const Homepage = () => {

  return (
   <>
    <Topbar></Topbar>
   <Navbars></Navbars>
   <Banner></Banner>
   {/*Newarraivale not fixed*/}
   <Newarrival></Newarrival>
   <Featured></Featured>
   <Collection></Collection>
   <Footer></Footer>
   </>
  )
}

export default Homepage