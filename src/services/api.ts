import axios from "axios";


export const api = axios.create({
    baseURL: 'https://odair-dev-m6-t16.onrender.com',
    timeout: 10000
})