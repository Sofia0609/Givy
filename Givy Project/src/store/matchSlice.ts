import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import {
  getMatchesByUser,
  getMatchById,
  uploadMatchVideo,
  updateMatchVideo,
  getOtherUserVideo
} from '../services/matchService'
import type { Match } from '../types/index'

// --- Thunks ---
export const fetchMatchesThunk = createAsyncThunk(
  'match/fetchMatches',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await getMatchesByUser(userId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMatchByIdThunk = createAsyncThunk(
  'match/fetchMatchById',
  async (matchId: string, { rejectWithValue }) => {
    try {
      return await getMatchById(matchId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const uploadMatchVideoThunk = createAsyncThunk(
  'match/uploadVideo',
  async (
    { matchId, userId, file, isUser1 }: { matchId: string; userId: string; file: File; isUser1: boolean },
    { rejectWithValue }
  ) => {
    try {
      const videoUrl = await uploadMatchVideo(matchId, userId, file)
      await updateMatchVideo(matchId, isUser1, videoUrl)
      return { matchId, isUser1, videoUrl }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchOtherUserVideoThunk = createAsyncThunk(
  'match/fetchOtherUserVideo',
  async ({ matchId, userId }: { matchId: string; userId: string }, { rejectWithValue }) => {
    try {
      const url = await getOtherUserVideo(matchId, userId)
      return { matchId, url }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// --- State ---
interface MatchState {
  matches: Match[]
  selectedMatch: Match | null
  otherUserVideos: Record<string, string | null>
  loading: boolean
  uploading: boolean
  error: string | null
}

const initialState: MatchState = {
  matches: [],
  selectedMatch: null,
  otherUserVideos: {},
  loading: false,
  uploading: false,
  error: null,
}

// --- Slice ---
const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setSelectedMatch(state, action: PayloadAction<Match | null>) {
      state.selectedMatch = action.payload
    },
    clearMatchError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMatchesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.matches = action.payload
      })
      .addCase(fetchMatchesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(fetchMatchByIdThunk.fulfilled, (state, action) => {
        state.selectedMatch = action.payload
      })

    builder
      .addCase(uploadMatchVideoThunk.pending, (state) => {
        state.uploading = true
      })
      .addCase(uploadMatchVideoThunk.fulfilled, (state, action) => {
        state.uploading = false
        const { matchId, isUser1, videoUrl } = action.payload
        const match = state.matches.find(m => m.id === matchId)
        if (match) {
          if (isUser1) {
            match.videoSentByUser1 = true
            match.videoIdUser1 = videoUrl
          } else {
            match.videoSentByUser2 = true
            match.videoIdUser2 = videoUrl
          }
        }
        if (state.selectedMatch?.id === matchId) {
          if (isUser1) {
            state.selectedMatch.videoSentByUser1 = true
            state.selectedMatch.videoIdUser1 = videoUrl
          } else {
            state.selectedMatch.videoSentByUser2 = true
            state.selectedMatch.videoIdUser2 = videoUrl
          }
        }
      })
      .addCase(uploadMatchVideoThunk.rejected, (state, action) => {
        state.uploading = false
        state.error = action.payload as string
      })

    builder
      .addCase(fetchOtherUserVideoThunk.fulfilled, (state, action) => {
        const { matchId, url } = action.payload
        state.otherUserVideos[matchId] = url
      })
  }
})

export const { setSelectedMatch, clearMatchError } = matchSlice.actions
export default matchSlice.reducer