import axios from 'axios'

const API_URL = 'https://jet-pulse-api.onrender.com/api/blogs/'
// Get user blogs
const getblogs = async () => {
  const response = await axios.get(API_URL)

return response.data
}

const addblog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL , blogData, config)

  return response.data
}
const editblog = async (formData, token) => {
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

const deleteblog = async (id, token) => {

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

const blogService = {
  getblogs,
  addblog,
  editblog,
  deleteblog
}


export default blogService
