import React, { useState } from 'react'
import FileBase64 from 'react-file-base64';
import { useHistory } from 'react-router';
import { signupUser } from '../helpers/apiCalls';

const initialState = {
  avatar: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcomic-cons.xyz%2Fwp-content%2Fuploads%2FStar-Wars-avatar-icon-Ewok.png&f=1&nofb=1',
  username: '',
  email: '',
  password: ''
}

const Signup = () => {
  const [ userInputs, setUserInputs ] = useState(initialState)

  let history = useHistory()

  const handleInput = (e) => {
    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userApi = await signupUser(userInputs)
    if (!userApi.error) {
      history.push('/users')
    }
  }


  return (
    <section className='page-wrapper' id='signup'>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-container avatar">
          <label htmlFor="avatar">
            <img src={userInputs.avatar} alt="avatar" />
          </label>
          <FileBase64
            type='file'
            accept='image/*'
            id='avatar'
            multiple={ false }
            onDone={({base64}) => setUserInputs({
              ...userInputs,
              avatar: base64
            })}
          />
        </div>

        <div className="input-container">
          <input type="text" name="username" placeholder='Username' autoComplete='off' required onChange={handleInput}/>
        </div>

        <div className="input-container">
          <input type="email" name="email" placeholder='Email' autoComplete='off' required onChange={handleInput}/>
        </div>

        <div className="input-container">
          <input type="password" placeholder='Password' name="password" autoComplete='off' required onChange={handleInput}/>
        </div>

        <button type="submit">SIGNUP</button>
      </form>
    </section>
  )
}

export default Signup
