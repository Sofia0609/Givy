 develop
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAllVideos } from '../services/videoService'
import { getAllUsers } from '../services/userService'
import type { FeedItem } from '../types/index'

interface VideoState {
  feedItems: FeedItem[]

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Video } from '../types/index'

interface VideoState {
  videos: Video[]
feature-search
  loading: boolean
  error: string | null
}

const initialState: VideoState = {
 develop
  feedItems: [],

  videos: [],
 feature-search
  loading: false,
  error: null
}

 develop
// Thunk: bring videos and users set up the FeedItems
export const fetchFeed = createAsyncThunk(
  'videos/fetchFeed',
  async (loggedUserId: string) => {
    const [videos, users] = await Promise.all([
      getAllVideos(),
      getAllUsers()
    ])

    // Exclude the videos user logged in has uploaded
    const filtered = videos.filter(v => v.userId !== loggedUserId)

    const items: FeedItem[] = filtered
      .map(video => {
        const user = users.find(u => u.id === video.userId)
        if (!user) return null
        return { video, user }
      })
      .filter((item): item is FeedItem => item !== null)

    return items
  }
)

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearFeed: (state) => {
      state.feedItems = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeed.fulfilled, (state, action: PayloadAction<FeedItem[]>) => {
        state.loading = false
        state.feedItems = action.payload
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Error loading feed'
      })
  }
})

export const { clearFeed } = videoSlice.actions

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
 feature-search
export default videoSlice.reducer