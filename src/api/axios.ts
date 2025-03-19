import axios from 'axios';

const api = axios.create({
    baseURL: 'http://local.rooftoplog.com:8236/',
    timeout: 1000,
});

export default api;
