import axios from "../config/axios";

const buyingApi = {};

buyingApi.fate = (body) => axios.post("/buy/fate", body);
buyingApi.gem = (body) => axios.post("/buy/gem", body);

export default buyingApi;
