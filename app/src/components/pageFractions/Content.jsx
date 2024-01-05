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
import toast, { Toaster } from 'react-hot-toast'
import Note from './Note'
import ErrorComponent from './ErrorComponent'
import { AddNoteButton, SaveNoteButton, DiscardNoteButton, AffilliationButton, DeleteNoteButton } from '../utils/Buttons'
import { pushNote, fetchAuthorsAndAffiliations, deleteNote } from '../utils/FetchFunctions'

const Content = React.memo((props) => {

  const content = props.content
  const content_id = content.content_id
  const signedIn = props.signedIn
  const [affiliations, setAffiliations] = useState([])
  const [showAffiliations, setShowAffiliations] = useState(false)
  const [showNoteComponent, setShowNoteComponent] = useState(false)
  const [noteRef, setNoteRef] = useState(props.note || '')
  const [pushNoteError, setPushNoteError] = useState(false)
  const [removeNote, setRemoveNote] = useState(false);
  const [pushedNote, setPushedNote] = useState(false);
  const [loading, setLoading] = useState(false);

  const spinner = (
    <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
  )    

  /** notification functions for saving or updating and deleting notes */
  const notifySave = () => toast('Note saved/updated, successfully!')
  const notifyDelete = () => toast('Note deleted, successfully!')
  const notifySaveError = () => toast('Note is empty or unchanged, please add/edit note and try again!')
  const notifyTooLong = () => toast('Note is too long, max 250 characters allowed!')

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        setLoading(true)
        if (showAffiliations) {
          const data = await fetchAuthorsAndAffiliations(content_id)
          setAffiliations(data)
        }
      } catch (error) {
        <ErrorComponent message={error.message} />
      }finally{
        setLoading(false)
      }
    }

    fetchAffiliations()
  }, [showAffiliations, content_id])

  useEffect(() => {
    const deleteThisNote = async () => {
      try {
        setLoading(true)
        const data = await deleteNote(content_id)
        if (data.message === 'success') {
          notifyDelete()
          setRemoveNote(false)
          props.setNoteUpdated(!props.noteUpdated)
        }
      } catch (error) {
        <ErrorComponent message={error.message} />
      }finally{
        setLoading(false)
      }
    }
    if (removeNote) {
      deleteThisNote()
    }

  }, [removeNote === true])

  useEffect(() => {
    const pushThisNote = async () => {
      try {
        setLoading(true)
        const data = await pushNote(noteRef, content_id)
        if (data.message === 'success') {
          notifySave()
          props.setNoteUpdated(!props.noteUpdated)
          setPushNoteError(false)
        }else{
          setPushNoteError(true)
        }
      } catch (error) {
        <ErrorComponent message={error.message} />
      }finally{
        setLoading(false)
      }
    }
    if (pushedNote) {
      pushThisNote()
      setPushedNote(false)
    }
  }, [pushedNote === true])

  const handleAffiliationClick = (e) => {
    e.stopPropagation()
    setShowAffiliations(!showAffiliations)
  }

  const handleAddNote = (e) => {
    e.stopPropagation()
    setShowNoteComponent(!showNoteComponent)
  }

  const handleSaveNote = async (e) => {
    e.stopPropagation()
    if (noteRef.length > 250) {
      notifyTooLong()
      return
    }else if (noteRef === props.note || noteRef === '') {
      notifySaveError()
      return
    }else {
      setPushedNote(true);
      setShowNoteComponent(!showNoteComponent)
    }
  }

  const handleDeleteNote = async (e) => {
    e.stopPropagation()
    setRemoveNote(true)
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
        <span className="font-normal"> {content.institution}</span>
      </li>
      <li>
        <span className="font-bold">City:</span>
        <span className="font-normal"> {content.city}</span>
      </li>
      <li >
        <span className="font-bold">Country:</span>
        <span className="font-normal"> {content.country}</span>
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
          <p className="font-normal">Type: {props.content.type_name}</p>
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
              {pushNoteError && (<ErrorComponent message='Note is too large max 250 characters allowed' />)}
            </>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center mb-6'>
      {loading ? spinner : <>
        {showAffiliations && (
          <div className="flex flex-wrap md:w-9/12 text-center font-bold p-4 border border-gray-300 rounded-md shadow-lg my-2">
            {affiliationJSX}
          </div>
        )}
        </>
      }
      </div>
    </>
  )
})

export default Content