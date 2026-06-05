import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { getUserById, updateUser } from '../services/userService'
import { supabase } from '../lib/supabase'
import type { User } from '../types/index'

// --- Thunks ---
export const loginThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) return rejectWithValue(authError.message)

      const profile = await getUserById(authData.user.id)
      return profile as User
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await supabase.auth.signOut()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async ({ id, changes }: { id: string; changes: Partial<User> }, { rejectWithValue }) => {
    try {
      const updated = await updateUser(id, changes)
      return updated
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// --- State ---
interface UserState {
  currentUser: User | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
}

// --- Slice ---
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    clearUser: (state) => {
      state.currentUser = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.currentUser = null
      })

    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { setUser, clearUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer