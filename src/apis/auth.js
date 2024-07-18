import axios from "../config/axios";

const authApi = {};

authApi.register = (body) => axios.post("/auth/register", body);

authApi.login = (body) => axios.post("/auth/login", body);

authApi.getAuthUser = () => axios.get("/auth/me");

authApi.editProfile = (body) => axios.patch("auth/profile", body);

export default authApi;
