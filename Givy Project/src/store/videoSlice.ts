import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
