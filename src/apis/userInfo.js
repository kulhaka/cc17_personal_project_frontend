import axios from "../config/axios";

const userInfoApi = {};

userInfoApi.getUserInfo = () => axios.get("/auth/userinfo");

export default userInfoApi;
