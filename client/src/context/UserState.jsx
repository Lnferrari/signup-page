import React, { Children, useEffect, useState } from 'react'
import { authenticateUser } from '../helpers/apiCalls'
import UserContext from './UserContext'

const UserState = ({children}) => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    const auth = async () => {
      try {
        const resApi = await authenticateUser()
        if (!resApi.error) {
          setUser(resApi)
          return
        }
        setUser(null)
      } catch (err) {
        console.log(err);
      }
    }
    auth()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState
