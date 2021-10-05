import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../helpers/apiCalls'
import { useHistory } from 'react-router'

const UserList = () => {
  const [ userList, setUserList ] = useState([])

  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const usersApi = await getAllUsers()
      if (usersApi.error) {
        history.push('/')
        return
      }
      setUserList(usersApi)
    }
    fetchData()
  }, [])

  return (
    <section className='page-wrapper' id='userlist'>
      <h1>Users</h1>
      {
        userList && userList.map(user =>
          <div className="user-card">
            <div className="user-avatar-container">
              <img src={user.avatar} alt="user avatar" />
            </div>
            <div className="user-data">
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        )
      }
    </section>
  )
}

export default UserList
