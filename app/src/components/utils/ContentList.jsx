/** 
 * ContentList component
 * 
 * This component recieves a list of contents
 * and passes them to the Content component
 * to be styled and rendered.
 * 
 * @author Ghulam Hassan Hassani <w20017074>
 */
import React from 'react'
import Content from '../pageFractions/Content'

const ContentList = ({ contents, awards, notes, signedIn }) => {
  return (
    <div>
      {contents.map((content, index) => (
        <Content
          key={index}
          content={content}
          index={index}
          awards={awards}
          notes={notes}
          signedIn={signedIn}
        />
      ))}
    </div>
  )
}

export default ContentList
