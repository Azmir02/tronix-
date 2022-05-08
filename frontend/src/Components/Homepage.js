import React from 'react'
import Navbars from './Navbars'
import Topbar from './Topbar'
import Footer from './layouts/Footer'
import Banner from './Banner'
import Newarrival from './Newarrival'

const Homepage = () => {
  return (
   <>
    <Topbar></Topbar>
   <Navbars></Navbars>
   <Banner></Banner>
   <Newarrival></Newarrival>
   <Footer></Footer>
   </>
  )
}

export default Homepage