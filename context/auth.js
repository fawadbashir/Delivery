import React, {createContext, useState} from 'react'

export const AppContext = createContext({})

export const AppProvider = (props) => {
  const [user, setUser] = useState()
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [otp, setOtp] = useState([])
  const [userType, setUserType] = useState('')

  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
  })

  const addToCart = () => {}

  const addToOtp = (value) => {
    setOtp((prevOtp) => [...prevOtp, value.toString()])
    console.log(otp)
  }

  const clearOtpValue = () => {
    const lastValue = otp.pop()

    setOtp((prevOtp) => prevOtp.filter((item) => item !== lastValue))
  }

  const login = (user) => {
    setUser(user)
  }
  const logout = () => setUser(null)

  const changeUserType = (user) => {
    setUserType(user)
  }

  const userForgotPassword = () => setIsForgotPassword(true)

  return (
    <AppContext.Provider
      value={{
        login,
        user,
        userForgotPassword,
        isForgotPassword,
        addToOtp,
        otp,
        clearOtpValue,
        changeUserType,
        userType,
        setOtp,
        logout,
      }}>
      {props.children}
    </AppContext.Provider>
  )
}
