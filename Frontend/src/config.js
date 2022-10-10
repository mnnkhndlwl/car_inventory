// import axios from "axios";

// //let axios = Axios.create({ withCredentials: true });

//  // axios.defaults.withCredentials = true;

// export const axiosInstance = axios.create({
//     baseURL : "http://localhost:5000/" 
// });

import axios from "axios";

const BASE_URL = "http://localhost:5000/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
console.log(user);
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

