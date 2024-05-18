import axios from 'axios'

const API_URL = 'https://njookaziapi.qualityasoftwares.com/api/jobs/';
// const API_URL = 'http://localhost:5000/api/jobs/'
// Get user jobs
const getjobs = async () => {
  const response = await axios.get(API_URL)
  if (response.data) {
    localStorage.setItem('jobs', JSON.stringify(response.data))
  }
  return response.data
}

const addjob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, jobData, config)

  return response.data
}
const editjob = async (formData, token) => {
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
const deletejob = async (id, token) => {

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
const jobService = {
  getjobs,
  addjob,
  editjob,
  deletejob
}


export default jobService
