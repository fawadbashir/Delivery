import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
  const [user, setUser] = useState({userId: '', userPhone: ''})

  const login = (id, phone) => {
    setUser({userId: id, userPhone: phone})
  }

  return (
    <AuthContext.Provider value={{login, user}}>
      {props.children}
    </AuthContext.Provider>
  )
}
