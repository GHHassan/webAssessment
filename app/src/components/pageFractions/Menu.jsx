/**
 * Menu component
 * 
 * This component styles and renders the menu
 * and link them to the relevant pages.
 * 
 * @uses Link from react-router-dom
 * @author Ghulam Hassan Hassani <w20017074>
 */

import React from 'react'
import { Link } from 'react-router-dom'
function Menu() {
  return (
    <div className="bg-black p-2 text-md font-bold justify-center">
        <ul className='flex justify-center gap-10'>
            
            <Link to="/">
              <li className='mb-3 bg-stone-200 rounded-md px-4 text-center hover:bg-sky-500 '>
                Home
              </li>
            </Link>
            <Link to="/countries">
            <li className='mb-3 bg-stone-200 rounded-md px-4 text-center hover:bg-sky-500 '>
                Countries
              </li></Link>
            <Link to="/contents">
            <li className='mb-3 bg-stone-200 rounded-md px-4 text-center hover:bg-sky-500 '>
                Contents
              </li>
            </Link>
        </ul>
    </div>
  )
}

export default Menu