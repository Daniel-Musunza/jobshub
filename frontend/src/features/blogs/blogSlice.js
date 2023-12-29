import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from './blogService'

const initialState = {
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user blogs
export const getblogs = createAsyncThunk(
  'blogs/getAll',
  async (_, thunkAPI) => {
    try {
      return await blogService.getblogs()
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
export const editblog = createAsyncThunk(
  'blogs/update',
  async (blogData, thunkAPI) => {
    try {
      const { id } = blogData; // Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await blogService.editblog(blogData, id, token);
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

export const addblog = createAsyncThunk(
  'blogs/create',
  async (blogData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await blogService.addblog(blogData,token);
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
export const blogSlice = createSlice({
  name: 'blog',
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
      .addCase(getblogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getblogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blogs = action.payload
      })
      .addCase(getblogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      .addCase(editblog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editblog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blogs = action.payload
      })
      .addCase(editblog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addblog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addblog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blogs.push(action.payload)
      })
      .addCase(addblog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = blogSlice.actions
export default blogSlice.reducer
