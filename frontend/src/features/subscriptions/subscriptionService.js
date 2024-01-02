import axios from 'axios'

const API_URL = '/api/contacts/subscribe/'

const subscribe = async (email) => {

  const response = await axios.post(API_URL , email)

  return response.data
}


const subscriptionService = {
  subscribe
}

export default subscriptionService
