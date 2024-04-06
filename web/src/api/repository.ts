import axios from 'axios';

const baseDomain = 'http://localhost:8080';
const baseURL = `${baseDomain}/api`;

// axios instanceの詳細については、以下を参照。
// https://axios-http.com/docs/instance
export default axios.create({
  baseURL
});
