import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import profileReducer from './profileSlice'
import matchReducer from './matchSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    match: matchReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch