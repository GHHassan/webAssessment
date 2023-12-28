/**
 * Content component,
 * 
 * This component is used to manage the ChI2023 contents.
 * displays author and affiliations of the content.
 * displays user's note of the content if the user is signed in and
 * has been used in the Contents page.
 * buttons are dynamically updated based on the user's actions and data
 * availablility.
 * 
 * to make the code manageable  sand reusable and maintainable, this component
 * is using:
 * functions from FetchFuncions.jsx to fetch the data from the server
 * JSX from Buttons.jsx to display the buttons
 * JSX from Note.jsx to display the note component
 * 
 * react-hot-toast is used to display a toast message when the user note 
 * is save successfully.
 * 
 * some of the props are lifted to avoide unnecessary fethcing and
 * re-rendering of the components
 * 
 * @usedBy ContentsList.jsx 
 * @param {Content awards signedIn notes setNotes} props
 * @returns Content with author and affiliations and note component if the user is signed in
 * @author Ghulam Hassan Hassani <w20017074>
 * 
 */

import React, { useEffect, useState } from 'react'
import toast, { Toaster} from 'react-hot-toast'
import Note from './Note'
import ErrorComponent from './ErrorComponent'
import { AddNoteButton, SaveNoteButton, DiscardNoteButton, AffilliationButton, DeleteNoteButton } from '../utils/Buttons'
import { pushNote, fetchAuthorsAndAffiliations, deleteNote } from '../utils/FetchFunctions'

const Content = (props) => {

  const content = props.content
  const content_id = content.content_id
  const signedIn = props.signedIn
  const [affiliations, setAffiliations] = useState([])
  const [showAffiliations, setShowAffiliations] = useState(false)
  const [showNoteComponent, setShowNoteComponent] = useState(false)
  const [noteRef, setNoteRef] = useState(props.note || '')
  const [pushNoteError, setPushNoteError] = useState(false)

  /** notification functions for saving or updating and deleting notes */
  const notifySave = () => toast('Note saved/updated, successfully!')
  const notifyDelete = () => toast('Note deleted, successfully!')
  const notifySaveError = () => toast('Note is empty or not changed, please add note and try again!')
  const notifyLongNote = () => toast('Note is too long, please shorten it and try again!')

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        if (showAffiliations) {
          const data = await fetchAuthorsAndAffiliations(content_id)
          setAffiliations(data)
        }
      } catch (error) {
        <ErrorComponent message={error.message} />
      }
    }

    fetchAffiliations()
  }, [showAffiliations, content_id])

  const saveNote = async () => {
    if(noteRef === '' || content_id === null) {
      notifySaveError()
      return
    }
    try {
      const data = await pushNote(noteRef, content_id)
      if (data.message === 'success') {
        notifySave()
        props.setNoteUpdated(true)
      } else if (data.message === 'note too long') {
        notifyLongNote()
        setPushNoteError(true)
      }
    } catch (error) {
      <ErrorComponent message={error.message} />
    }
  }

  const removeNote = async () => {
    try {
      const data = await deleteNote(content_id)
      if (data.message === 'success' ) {
        notifyDelete()
        props.setNoteUpdated(!props.noteUpdated)
      }
    } catch (error) {
      <ErrorComponent message={error.message} />
    }
  }
  const handleAffiliationClick = (e) => {
    e.stopPropagation()
    setShowAffiliations(!showAffiliations)
  }

  const handleAddNote = (e) => {
    e.stopPropagation()
    setShowNoteComponent(!showNoteComponent)
  }

  const handleSaveNote = async(e) => {
    e.stopPropagation()
    await saveNote()
    props.setNoteUpdated(!props.noteUpdated)
    setShowNoteComponent(!showNoteComponent)
  }

  const handleDeleteNote = async(e) => {
    e.stopPropagation()
    await removeNote()
    props.setNoteUpdated(!props.noteUpdated)
    setShowNoteComponent(!showNoteComponent)
    
  }

  const affiliationJSX = affiliations.map((content, index) => (
    
      <ul key={index} 
        className="list-none border p-4 mb-4 mr-4 rounded shadow-md w-96 flex flex-col text-left">
        <li >
          <span className="font-bold">Name:</span>
          <span className="font-normal"> {content.author_name}</span>
        </li>
        <li >
          <span className="font-bold">Institution:</span>
          <span className="font-normal"> {content.affiliation_institution}</span>
        </li>
        <li className="col-span-4 mb-2 flex-grow">
          <span className="font-bold">City:</span>
          <span className="font-normal"> {content.affiliation_city}</span>
        </li>
        <li >
          <span className="font-bold">Country:</span>
          <span className="font-normal"> {content.affiliation_country}</span>
        </li>
      </ul>
  ));
  
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center ">
      <div>
        <Toaster 
          toastOptions={
            {
              className: '',
              style: {
                background: '#3a80c9',
                color: '#fff',
              }
          }
        }
        />
      </div>
        <div className="w-full md:w-9/12 text-center font-bold p-4 border border-gray-300 rounded-md shadow-lg hover:bg-blue-100 my-2">
          <h2>{props.content.content_title}</h2>
          <p className="font-normal">Type: {props.content.content_type}</p>
          <p className="font-normal">
            Award: {props.awards[content_id] ? props.awards[content_id] : 'No Awards, yet'}
          </p>
          <p className="font-normal">Abstract: {props.content.content_abstract}</p>
          {<AffilliationButton
            handleAffiliation={handleAffiliationClick}
            showAffiliations={showAffiliations}
          />}
          {signedIn && (
            <AddNoteButton 
              handleAddNote={handleAddNote} 
              hasNote={props.note} 
              showNoteComponent={showNoteComponent} />
          )}
          {showNoteComponent && (
              <>
                <SaveNoteButton handleSaveNote={handleSaveNote} />
                <DiscardNoteButton handleAddNote={handleAddNote} />
                {props.note && (
                  <DeleteNoteButton handleDeleteNote={handleDeleteNote} />
                )}
                <Note
                  showNoteComponent={showNoteComponent}
                  setShowNoteComponent={setShowNoteComponent}
                  noteRef={noteRef}
                  setNoteRef={setNoteRef}
                  pushNoteError={pushNoteError}
                  note={props.note}
                />
                {pushNoteError && <p className="text-red-500">Note is too long, please shorten it and try again!</p>}
              </>
            )}
        </div>
      </div>
      <div className='flex items-center justify-center mb-6'>
        {showAffiliations && (
          <div className="flex flex-wrap md:w-9/12 text-center font-bold p-4 border border-gray-300 rounded-md shadow-lg my-2">
            {affiliationJSX}
          </div>
        )}
      </div>
    </>
  )
}

export default Content
