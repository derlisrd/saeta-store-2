import React from 'react'
import UsersLista from './UsersLista'
import UsersProvider from './UsersProvider'

const Users = () => {
  return (
    <UsersProvider>
      <UsersLista />
    </UsersProvider>
  )
}

export default Users
