import axios from "axios";

function api() {
  return axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// api.withCredentials

export default api;
