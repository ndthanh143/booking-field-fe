import axios from 'axios';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('access_token');

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
