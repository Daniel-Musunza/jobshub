import axios from 'axios'

// const API_URL = 'http://localhost:5000/api/hackathons/'
const API_URL = 'https://njookaziapi.qualityasoftwares.com/api/hackathons/'
// Get user hackathons
const gethackathons = async () => {
  const response = await axios.get(API_URL)
  if (response.data) {
    localStorage.setItem('events', JSON.stringify(response.data))
  }
  return response.data
}

const addhackathon = async (hackathonData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, hackathonData, config)

  return response.data
};
const deletehackathon = async (id, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const edithackathon = async (formData, token) => {
  const id = formData.get('id'); // Retrieve the id from formData

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const hackathonService = {
  gethackathons,
  addhackathon,
  edithackathon,
  deletehackathon
}


export default hackathonService
