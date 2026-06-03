import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Video } from '../types/index'

interface VideoState {
  videos: Video[]
  loading: boolean
  error: string | null
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})

export const { setVideos, setLoading, setError } = videoSlice.actions
export default videoSlice.reducer