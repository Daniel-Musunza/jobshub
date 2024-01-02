import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/auth/authSlice'
import jobReducer from '../features/jobs/jobSlice'
import blogReducer from '../features/blogs/blogSlice'
import hackathonReducer from '../features/hackathons/hackathonSlice'
import messageReducer from '../features/messages/messageSlice'
import subscriptionReducer from '../features/subscriptions/subscriptionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    jobs: jobReducer,
    blogs: blogReducer,
    hackathons: hackathonReducer,
    messages: messageReducer,
    subscriptions: subscriptionReducer
  },
})
