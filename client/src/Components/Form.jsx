import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { signupUser, loginUser } from '../helpers/apiCalls';
import Resizer from "react-image-file-resizer";

const initialState = {
  // avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1',
  username: '',
  password: ''
}

const Form = () => {
  const [ userInputs, setUserInputs ] = useState(initialState)

  let { pathname: route } = useLocation()
  let history = useHistory()

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const fileHandler = async (e) => {
    const file = e.target.files[0]
    const image = await resizeFile(file)
    setUserInputs({
      ...userInputs,
      avatar: image
    })
  };

  const handleInput = (e) => {
    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userApi = {}
    try {
      if (route.includes('/signup')) {
        userApi = await signupUser(userInputs)
      } else {
        userApi = await loginUser(userInputs)
      }

      if (!userApi.error) {
        history.push('/users')
      }

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
        
        {
          route.includes('/signup')
          ? <>
            <div className="input-container avatar">
              <label htmlFor="avatar">
                <img src={userInputs.avatar || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1'} alt="avatar" />
                { !userInputs.avatar && <p>Choose an avatar</p>}
              </label>
              <input type="file" accept='image/*' name="avatar" id="avatar" onChange={fileHandler}/>
            </div>

            <div className="input-container">
              <input type="email" name="email" placeholder='Email' autoComplete='off' required onChange={handleInput}/>
            </div>
          </>
          : <div className="input-container">
              <img src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.sqhUFRHRSP73IW9-wcDMcQHaHa%26pid%3DApi&f=1'} alt="avatar" />
            </div>
        }

        <div className="input-container">
          <input type="text" name="username" placeholder='Username' autoComplete='off' required onChange={handleInput}/>
        </div>

        <div className="input-container">
          <input type="password" placeholder='Password' name="password" autoComplete='off' required onChange={handleInput}/>
        </div>

        <button type="submit">
          {
            route.includes('/login')
            ? 'LOGIN'
            : 'SIGNUP'
          }
        </button>

      </form>
  )
}

export default Form
