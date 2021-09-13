import {useState, useCallback, useEffect, useRef} from 'react'

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      const httpAbortCntrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCntrl)

      setIsLoading(true)
      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCntrl.signal,
        })
        const responseData = await response.json()
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCntrl,
        )

        if (!response.ok) {
          // console.log(responseData.message)
          console.log(responseData)
          throw new Error(responseData.message)
        }
        // console.log(response)
        setIsLoading(false)
        return responseData
      } catch (e) {
        console.log(e.message)
        setError(e.message)
        setIsLoading(false)
        throw e
      }
    },
    [],
  )
  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () =>
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort())
  }, [])

  return {isLoading, error, sendRequest, clearError}
}
