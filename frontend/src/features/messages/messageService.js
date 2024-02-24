import axios from 'axios'

const API_URL = 'https://jetpulseapi.qualityasoftwares.com/api/contacts/'

const getmessages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config)

  return response.data
}

const addmessage = async (messageData) => {
  const response = await axios.post(API_URL , messageData)

  return response.data
}


const messageService = {
  getmessages,
  addmessage

}

export default messageService
