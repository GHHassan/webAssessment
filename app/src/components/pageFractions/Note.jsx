/**
 * Note component
 * 
 * This component is used to render the note
 * that is passed to it as a prop.
 * if the note is empty a placeholder
 * otherwise the note will be displayed.
 * 
 * @author Ghulam Hassan Hassani <w20017074>
 */

const Note = (props) => {
  
  return (
    <div>
      <div onClick={(e) => e.stopPropagation()}>
        <h4>Notes</h4>
        <textarea
          onChange={(e) => props.setNoteRef(e.target.value)}
          className="w-7/12"
          name="comment"
          rows={5}
          cols={50}
          placeholder="Enter your Note here"
          defaultValue={props.note || ''}
        />
      </div>
      <div>
        {props.pushNoteError && (
          <p className="text-red">Something went wrong, try saving again</p>
        )}
      </div>
    </div>
  )
}

export default Note
