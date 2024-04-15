import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jobService from './jobService'

const initialState = {
  jobs: [],
  isError: false,
  success: false,
  loading: false,
  message: '',
}

// Get user jobs
export const getjobs = createAsyncThunk(
  'jobs/getAll',
  async (_, thunkAPI) => {
    try {
      return await jobService.getjobs()
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
export const editjob = createAsyncThunk(
  'jobs/update',
  async (jobData, thunkAPI) => {
    try {
      const { id } = jobData; // Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.editjob(jobData, id, token);
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
export const addjob = createAsyncThunk(
  'jobs/create',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.addjob(jobData, token);
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
export const deletejob = createAsyncThunk(
  'jobs/delete',
  async (id, thunkAPI) => {
    try {// Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.deletejob(id, token );
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
export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.success = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getjobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getjobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(getjobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(editjob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editjob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(editjob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addjob.pending, (state) => {
        state.loading = true
      })
      .addCase(addjob.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.jobs.push(action.payload)
      })
      .addCase(addjob.rejected, (state, action) => {
        state.loading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deletejob.pending, (state) => {
        state.loading = true
      })
      .addCase(deletejob.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
      })
      .addCase(deletejob.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        console.error('Delete Job Error:', action.payload);
      })
      
  },
})

export const { reset } = jobSlice.actions
export default jobSlice.reducer
