import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messageService from './messageService';

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user jobs
export const getmessages = createAsyncThunk(
  'messages/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.getmessages(token)
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

export const addmessage = createAsyncThunk(
  'messages/create',
  async (messageData, thunkAPI) => {
    try {
      return await messageService.addmessage(messageData);
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


export const messageSlice = createSlice({
  name: 'message',
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
      .addCase(getmessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getmessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload
      })
      .addCase(getmessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(addmessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addmessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages.push(action.payload)
      })
      .addCase(addmessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})

export const { reset } = messageSlice.actions
export default messageSlice.reducer
