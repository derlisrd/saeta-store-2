import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import Permissions from './Permissions'
import UserFormEdit from './UserFormEdit'
import UserFormNew from './UserFormNew'
import UsersLista from './UsersLista'
import UsersProvider from './UsersProvider'

const Users = () => {
  return (
    <UsersProvider>
      <Permissions />
      <ChangePasswordForm />
      <UserFormEdit />
      <UserFormNew />
      <UsersLista />
    </UsersProvider>
  )
}

export default Users
