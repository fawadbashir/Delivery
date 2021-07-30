import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
  const [user, setUser] = useState({userId: '', userPhone: ''})
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [otp, setOtp] = useState([])

  const addToOtp = (value) => {
    setOtp((prevOtp) => [...prevOtp, value])
  }

  const clearOtpValue = () => {
    const lastValue = otp.pop()

    setOtp((prevOtp) => prevOtp.filter((item) => item !== lastValue))
  }

  const login = (id, phone) => {
    setUser({userId: id, userPhone: phone})
  }

  const userForgotPassword = () => setIsForgotPassword(true)

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        userForgotPassword,
        isForgotPassword,
        addToOtp,
        otp,
        clearOtpValue,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}
