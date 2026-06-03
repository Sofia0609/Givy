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

    