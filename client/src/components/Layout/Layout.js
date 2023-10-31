import React from 'react'
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

const Layout = ({children}) => {
  return (
    <div>
        <Header /> 
        <main style={{minHeight:'80vh'}}>{children}</main>
        <Footer />

    </div>
    
  )
}

export default Layout