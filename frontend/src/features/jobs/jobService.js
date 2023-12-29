import axios from 'axios'

const API_URL = '/api/jobs/'
// Get user jobs
const getjobs = async () => {
  const response = await axios.get(API_URL)

return response.data
}

const addjob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , jobData, config)

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

const jobService = {
  getjobs,
  addjob,
  editjob
}


export default jobService
