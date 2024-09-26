
const token = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,  // Ensure token has 'Bearer ' prefix
  },
  };
  export default  config;