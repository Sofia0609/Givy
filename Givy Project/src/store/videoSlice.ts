import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAllVideos } from '../services/videoService'
import { getAllUsers } from '../services/userService'
import type { FeedItem } from '../types/index'

interface VideoState {
  feedItems: FeedItem[]
  loading: boolean
  error: string | null
}

const initialState: VideoState = {
  feedItems: [],
  loading: false,
  error: null
}

// Thunk: trae videos + usuarios y arma los FeedItems
export const fetchFeed = createAsyncThunk(
  'videos/fetchFeed',
  async (loggedUserId: string) => {
    const [videos, users] = await Promise.all([
      getAllVideos(),
      getAllUsers()
    ])

    // Excluye los videos del usuario logueado
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
export default videoSlice.reducer