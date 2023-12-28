/**
 * ContentList component
 * 
 * Recieves the list of contents from the Contents Page on 
 * props. It then filters the contents based on the user input
 * and passes the filtered contents to the Content component
 * to be styled and rendered.
 * - if the user is signed in, fetches the users notes from the server
 *   and passthem to the Content component too. 
 * - Provides pagination and search functionality.
 * - pagination button are rendered both in top and bottom of the page 
 *  to make it easier for the user to navigate.
 * 
 * to make the code manageable and reusable and maintainable, this component
 * is using:
 * FetchFuncions.jsx 
 * Buttons.jsx to display the buttons
 * Content component to display the content
 * PageNotFound component to display the empty search result
 * Search and Select components to provide search and
 * dropdown search functionalities.
 * 
 * @usedBy Contents @Contents.jsx
 * @author Ghulam Hassan Hassani <w20017074>
 */

import React, { useState, useEffect } from 'react'
import NotFound from '../pages/NotFound'
import Content from '../pageFractions/Content'
import {PaginationButtons, ShowAllButton, PageNumbers } from '../utils/Buttons'
import { fetchNotes } from '../utils/FetchFunctions'
import Search from '../pageFractions/Search'
import Select from '../pageFractions/Select'

const ContentList = (props) => {

    const [search, setSearch] = useState('')
    const [type, setType] = useState('')
    const [page, setPage] = useState(1)
    const [showAll, setShowAll] = useState(false)
    const [notes, setNotes] = useState([])
    const [noteUpdated, setNoteUpdated] = useState(false)
    let maxPage = 0
    let token = localStorage.getItem('token') || ''

    useEffect(() => {
        if (props.signedIn) {
            const notes = async () => {
                try {
                    const data = await fetchNotes(token)
                    const notesArray = notesToArrayFormat(data)
                    setNotes(notesArray)
                } catch (error) {}
            }
            notes()
        }
    }, [noteUpdated, token])

    const notesToArrayFormat = (data) => {
        const resultMap = {}
        data.forEach(item => {
          resultMap[item.content_id] = item.note
        })
        return resultMap
      }

    const handleShowAllClicks = () => {
        setShowAll(!showAll)
    }

    const handleContentSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleType = (event) => {
        setType(event.target.value)
    }

    const selectType = (content) => {
        let foundInType = null
        if (content.type_name) {
            foundInType = content.type_name.toLowerCase().includes(type.toLowerCase())
        }
        return foundInType
    }

    const searchContent = (content) => {
        const foundInTitle = content.content_title.toLowerCase().includes(search.toLowerCase())
        return foundInTitle
    }

    const contentsJSX = props.contents
        .filter(searchContent)
        .filter(selectType)
        .map((content, index) => (
            <div key={index}>
                <Content 
                    content={content} 
                    awards={props.awards} 
                    signedIn={props.signedIn} 
                    note={notes[content.content_id]}
                    setNoteUpdated= {setNoteUpdated }
                    noteUpdated={noteUpdated}
                />
            </div>
        ))

    maxPage = Math.ceil(contentsJSX.length / 20)

    useEffect(() => {
        setPage(1)
    }, [maxPage])

    let pagedContentsJSX = []
    if (props.contents) {
        pagedContentsJSX = contentsJSX.slice((page - 1) * 20, page * 20)
    }

    const notFoundMessage = 'No matching content found, Please try differnt type of content or search term'
    return (
        <div className='md:flex-row md:items-center mb-4'>
            <div className='mb-5 p-4 border rounded bg-white'>
                <Search search={search} handleContentSearch={handleContentSearch} />
                {!showAll && <PageNumbers page={page} maxPage={maxPage} setPage={setPage} />}
                <ShowAllButton showAll={showAll} handleShowAll={handleShowAllClicks} setShowAll={setShowAll} />
                <Select options={props.types} value={props.type} onChange={handleType} />
                {!showAll &&
                    <PaginationButtons
                        page={page}
                        maxPage={maxPage}
                        setPage={setPage}
                    />}
                {showAll && contentsJSX.length > 0 ? contentsJSX : null}
                {!showAll && pagedContentsJSX.length > 0 ? pagedContentsJSX : null}
                {(contentsJSX.length === 0 && pagedContentsJSX.length === 0) && <NotFound message={notFoundMessage}/>}
                {!showAll &&
                    <PaginationButtons
                        page={page}
                        maxPage={maxPage}
                        setPage={setPage}
                    />}
            </div>
        </div>
    )
}

export default ContentList
