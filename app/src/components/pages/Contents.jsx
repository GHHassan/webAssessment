/**
 * Contents page
 * 
 * This component uses the ContentList component to display the contents and
 * its children including, Content, Note, author and Affiliations and awards.
 * furthermore, it provides typed and categorical search functionalities.
 * Additionally, it provides pagination to display the contents in a manageable
 * 20 contents per page format and a "Show All" button to display all contents in one page.
 * whilst the page provides pagination the search functionality is applied to all contents.
 * 
 * to reduce the amount of fetch requests to the server, the contents are fetched
 * once and then passed to the ContentList component. except for the authors and affiliations,
 * that will be fetched upon request with the button provided on th UI. 
 * The notes are only fetched if the user is signed in.
 * 
 * allows the user to add new note or edit notes that they have previously added to the content
 * can only be seen when the user is signed in, more details on
 * how and when can be found on doc comments provided on Contents.jsx and Note.jsx and re-writing 
 * here just adds to the complexity of the documentation.
 * 
 * Note funcitonality is provided, and the user can add, edit and delete notes.
 * the buttons are dynamically rendered based on the note status and 
 * the user actions. 
 * React hot toast is used to display the success and error messages.
 * 
 * @uses FetchFuncitons util to fetch the data from the server
 * @genreted 
 * @author Ghulam Hassan Hassani <w20017074>
 */

import React, { useEffect, useState } from 'react'
import ContentList from '../pageFractions/ContentList'
import { fetchContents, fetchAwards, fetchTypes } from '../utils/FetchFunctions'
import ErrorComponent from '../pageFractions/ErrorComponent'

const Contents = (props) => {

  const [showAll, setShowAll] = useState(false)
  const [awards, setAwards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchPromises = [fetchContents(), fetchAwards(), fetchTypes()]
        const [contentsData, awardsData, typesData] = await Promise.all(fetchPromises)
        const awardsArray = awardToArrayFormat(awardsData)
        setAwards(awardsArray)
        props.setContents(contentsData)
        props.setTypes(typesData)
      } catch (error) {
        <ErrorComponent message={error.message} />
      }
    }
    fetchData()
  }, [props.signedIn])

  const awardToArrayFormat = (data) => {
    const resultMap = {}
    data.forEach(item => {
      resultMap[item.content_id] = item.award_name
    })
    return resultMap
  }

  return <ContentList
    {...props}
    showAll={showAll}
    setShowAll={setShowAll}
    awards={awards}
  />
}

export default Contents
