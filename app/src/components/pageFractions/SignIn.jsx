/** 
 * SignIn component
 * 
 * This component sends a request process the user's
 * credentials, send them to the server and 
 * if the credintials were valid receives
 * a token in return.
 * 
 * if the credentials were invalid, it displays
 * an error message in red. 
 * else it stores the token in the local storage
 * and sets the signedIn state to true.
 * also it removes the token from the local storage
 * when the user signs out.
 * 
 * finally it renders the sign in and sign out buttons
 * styled based on the signedIn state.
 * 
 * @author Ghulam Hassan Hassani <w20017074>
 */

import { useRef, useState } from 'react'

function SignIn(props) {
  const usernameRef = useRef(HTMLInputElement>(null))
  const passwordRef = useRef(HTMLInputElement>(null))
  const [signinError, setSigninError] = useState(null)

  const signIn = () => {
    const encodedString = btoa(usernameRef.current.value + ':' + passwordRef.current.value)
    fetchData(encodedString)
  }

  const handleResponse = (response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      setSigninError('Invalid credentials. Please check your username and password.')
      throw new Error('invalid response: ' + response.status)
    }
  }

  const handleJSON = (data) => {
    if (data.message === 'success') {
      localStorage.setItem('token', data.token)
      props.setSignedIn(true)
      setSigninError(null)
    } else {
      setSigninError('Invalid response from the server.')
      throw new Error('invalid JSON: ' + data)
    }
  }

  const fetchData = (encodedString) => {
    fetch('https://w20017074.nuwebspace.co.uk/kf6012/coursework/api/token', {
      method: 'GET',
      headers: new Headers({ Authorization: 'Basic ' + encodedString }),
    })
      .then((response) => handleResponse(response))
      .then((json) => handleJSON(json))
      .catch(() => {
        setSigninError('An unexpected error occurred. Please try again later.')
      })
  }

  const signOut = () => {
    localStorage.removeItem('token')
    props.setSignedIn(false)
  }

  return (
    <div className='bg-black p-2 text-md text-right'>
      {!props.signedIn && (
        <div>
          <input
            onClick={() => {setSigninError(null)}}
            type='text'
            placeholder='username'
            className='p-1 mx-2 bg-slate-100 rounded-md text-black'
            ref={usernameRef}
          />
          <input
            type='password'
            placeholder='password'
            className='p-1 mx-2 bg-slate-100 rounded-md password text-black'
            ref={passwordRef}
          />
          <input
            type='submit'
            value='Sign In'
            className='py-1 px-2 mx-2 bg-blue-500 hover:bg-sky-500 rounded-md'
            onClick={signIn}
          />
        </div>
      )}
      {props.signedIn && (
        <div>
          <input
            type='submit'
            value='Sign Out'
            className='py-1 px-2 font-bold mx-2 bg-red-400 hover:bg-red-800 hover:text-white rounded-md'
            onClick={signOut}
          />
        </div>
      )}
      {signinError && <p className='text-red-300 text-sm '>{signinError}</p>}
    </div>
  )
}

export default SignIn
