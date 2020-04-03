import axios from 'axios';

const api = axios.create({
    baseURL: 'https://betheheroeliandrobackend.herokuapp.com'
});

export default api;