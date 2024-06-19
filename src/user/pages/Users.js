import React, { useEffect, useState } from 'react'

import { useHttpClient } from '../../shared/hooks/http'

import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  const [users, setUsers] = useState(null)
  const { http, error, isLoading, clearErrorHandler } = useHttpClient()

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { users: usersList } = await http(
          'http://localhost:5001/api/users'
        )

        setUsers(usersList)
      } catch (excepshun) {}
    }

    fetchAllUsers()
  }, [])

  return (
    <>
      {<ErrorModal error={error} onClear={clearErrorHandler} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </>
  )
}

export default Users
