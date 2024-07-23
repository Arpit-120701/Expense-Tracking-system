import React from 'react'
import Header from '../Layout/Header'
import Footer from './Footer'

function Layout( { children }) {
  return (
    <>
        <Header></Header>
        <div className='content'>
            { children }
        </div>
        <Footer></Footer>
    </>
  )
}

export default Layout
