import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserById, getVideosByUserId, followUser, unfollowUser } from '../services/userService'
import type { User, Video } from '../types/index'

// --- Thunks ---
export const fetchProfileThunk = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const user = await getUserById(userId)
      return user as User
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProfileVideosThunk = createAsyncThunk(
  'profile/fetchVideos',
  async (userId: string, { rejectWithValue }) => {
    try {
      const videos = await getVideosByUserId(userId)
      return videos as Video[]
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const followThunk = createAsyncThunk(
  'profile/follow',
  async ({ followerId, targetId }: { followerId: string; targetId: string }, { rejectWithValue }) => {
    try {
      await followUser(followerId, targetId)
      return true
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const unfollowThunk = createAsyncThunk(
  'profile/unfollow',
  async ({ followerId, targetId }: { followerId: string; targetId: string }, { rejectWithValue }) => {
    try {
      await unfollowUser(followerId, targetId)
      return false
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// --- State ---
interface ProfileState {
  viewedUser: User | null
  videos: Video[]
  loading: boolean
  error: string | null
}

const initialState: ProfileState = {
  viewedUser: null,
  videos: [],
  loading: false,
  error: null,
}

// --- Slice ---
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.viewedUser = null
      state.videos = []
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false
        state.viewedUser = action.payload
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(fetchProfileVideosThunk.fulfilled, (state, action) => {
        state.videos = action.payload
      })

    builder
      .addCase(followThunk.fulfilled, (state) => {
        if (state.viewedUser) {
          state.viewedUser.followers += 1
        }
      })

    builder
      .addCase(unfollowThunk.fulfilled, (state) => {
        if (state.viewedUser) {
          state.viewedUser.followers -= 1
        }
      })
  }
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer