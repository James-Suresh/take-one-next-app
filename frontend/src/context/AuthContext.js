// ** React Imports
import { useEffect } from 'react'

// ** Config
import { useDispatch } from 'react-redux'
import { fetchAuth } from 'src/store/slices/auth-slice';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // ** Hooks
  useEffect(() => {
    dispatch(fetchAuth())
  }, [])

  return <>{children}</>
}