import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import hackathonService from './hackathonService'

const initialState = {
  hackathons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user hackathons
export const gethackathons = createAsyncThunk(
  'hackathons/getAll',
  async (_, thunkAPI) => {
    try {
      return await hackathonService.gethackathons()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);
export const edithackathon = createAsyncThunk(
  'hackathons/update',
  async (hackathonData, thunkAPI) => {
    try {
      const { id } = hackathonData; // Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await hackathonService.edithackathon(hackathonData, id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addhackathon = createAsyncThunk(
  'hackathons/create',
  async (hackathonData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hackathonService.addhackathon(hackathonData,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const hackathonSlice = createSlice({
  name: 'hackathon',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gethackathons.pending, (state) => {
        state.isLoading = true
      })
      .addCase(gethackathons.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.hackathons = action.payload
      })
      .addCase(gethackathons.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      .addCase(edithackathon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(edithackathon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.hackathons = action.payload
      })
      .addCase(edithackathon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addhackathon.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addhackathon.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.hackathons.push(action.payload)
      })
      .addCase(addhackathon.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = hackathonSlice.actions
export default hackathonSlice.reducer
