import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import profileReducer from './profileSlice'
import matchReducer from './matchSlice'
import videoReducer from './videoSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    match: matchReducer,
    videos: videoReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch