// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/store/apps/user';
import permissions from 'src/store/apps/permissions';
import auth from 'src/store/slices/auth-slice';


export const store = configureStore({
  reducer: {
    auth,
    user,
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
