import axios from 'axios';

// TODO: 参照されていないっぽいので、対応する。
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.withCredentials = true;
