import axios from "axios";

//let axios = Axios.create({ withCredentials: true });

 // axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5000/" 
});

