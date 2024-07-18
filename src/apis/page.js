import axios from "../config/axios";

const pageApi = {};

pageApi.getBannerInfo = () => axios.get("/page/banner");

pageApi.getChartCourse = (bannerId) =>
  axios.get(`/page/chartcourse/${bannerId}`);

pageApi.setCourse = (body) => axios.post("/page/selectcourse", body);

pageApi.getRollHistory = () => axios.get("/page/history");

pageApi.deleteRollHistory = () => axios.delete("/page/history");

export default pageApi;
