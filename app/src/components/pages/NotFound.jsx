/** 
 * NotFound page 
 * 
 * This component takes a code and a message as props
 * adds a free picture from unsplash.com 
 * and renders them on the page.
 * 
 * @author Ghulam Hassan Hassani <w20017074>
 */

function NotFound(props) {
  const picture =
    "https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div className="m-10 text-center text-3xl">
      <h2>{props.code || ''}</h2>
      <p className="text-sm md:text-3xl m-5">{props.message}</p>
      <div>
        <img src={picture} alt="Page Not Found" />
      </div>
    </div>
  )
}

export default NotFound