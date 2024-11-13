import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://moviesbooking-backend.onrender.com/",
    headers:{
        withCredentials:"true",
        'Content-Type': 'application/json',
         authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

//http://localhost:3001
