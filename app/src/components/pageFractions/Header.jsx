/**
 * Header component
 * 
 * This component styles and renders the header
 * of the application. this includes the title,
 * sign in and sign out buttons and the nav menu.
 * 
 * @uses Menu and SignIn components
 * @author Ghulam Hassan Hassani <w20017074>
 */

import React from 'react'
import Menu from './Menu'
import SignIn from './SignIn'

function Header(props) {
  
  return (
    <div className='mb-7'>
      <h1 className='text-4xl text-center text-bold mb-4 '>KF6012 Course Work</h1>
      <SignIn 
        signedIn={props.signedIn} setSignedIn={props.setSignedIn} 
        favourites={props.favourites} setFavourites={props.setFavourites}
        />
      <Menu />
    </div>
  )
}

export default Header