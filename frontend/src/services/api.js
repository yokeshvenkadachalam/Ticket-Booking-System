import axios from "axios";

const API = axios.create({
  baseURL: "https://ticket-booking-system-yqlo.onrender.com"
});

export default API;