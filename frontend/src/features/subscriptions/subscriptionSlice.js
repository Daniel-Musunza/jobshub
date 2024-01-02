import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subscriptionService from './subscriptionService';

const initialState = {
  subscriptions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const subscribe = createAsyncThunk(
  'subscriptions/create',
  async (email, thunkAPI) => {
    try {
      return await subscriptionService.subscribe(email);
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

export const subscriptionSlice = createSlice({
  name: 'subscription',
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
    
      .addCase(subscribe.pending, (state) => {
        state.isLoading = true
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subscriptions.push(action.payload)
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
  },
})

export const { reset } = subscriptionSlice.actions
export default subscriptionSlice.reducer
