import axios from 'axios';

const baseDomain = import.meta.env.VITE_API_BASE_URL;
const baseURL = `${baseDomain}/api`;

// axios instanceの詳細については、以下を参照。
// https://axios-http.com/docs/instance
export default axios.create({
  baseURL
});
