import axios from "../config/axios";

const wishApi = {};

wishApi.wish = (body) => axios.post("/wish", body);

export default wishApi;
