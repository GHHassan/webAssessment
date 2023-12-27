/**
 * Home page
 * 
 * This component displays the home page of the ChI2023 
 * and reders a random content from the database.
 * the content is only fetched once in the App.jsx and
 * passed to this component to keep the same content on 
 * the home unless the user refreshes the page.
 * 
 * @usedBy App.jsx
 * @author Ghulam Hassan Hassani <w20017074>
 */

import React from "react"
import { Link } from "react-router-dom"

function Home(props) {

  return (
    <div className="text-center">
      <div>
        <h2 className="text-black font-bold">Content Title:
          {props.homeContent.length > 0 && props.homeContent[0].title}</h2>
        <p className="text-black">
          Content Link is
          <Link
            to={props.homeContent.length > 0 && props.homeContent[0].preview_video}>
            <span className="text-blue-700 italic font-bold"> here </span>
          </Link>
        </p>
        <p> Content URL is: {props.embed}</p>
        <p>You can also watch the embedded video below</p>
      </div>
      <div className="flex justify-center m-5">
        <iframe width="560" height="315" src={props.embed} allowFullScreen></iframe>
      </div>
    </div>
  )
}

export default Home