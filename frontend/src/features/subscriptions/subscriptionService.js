import axios from 'axios'

// const API_URL = 'https://jetpulseapi.qualityasoftwares.com/api/contacts/subscribe/'

const API_URL = 'http://localhost:5000/api/contacts/subscribe/'

const subscribe = async (email) => {

  const response = await axios.post(API_URL , email)

  return response.data
}


const subscriptionService = {
  subscribe
}

export default subscriptionService
