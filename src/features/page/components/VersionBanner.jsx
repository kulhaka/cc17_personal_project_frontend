/* eslint-disable react/prop-types */
import { AxiosError } from "axios";
import pageApi from "../../../apis/page";
import usePage from "../../../hooks/usePage";
import { toast } from "react-toastify";
import useUserInfo from "../../../hooks/useUserInfo";

export default function VersionBanner({ onSuccess }) {
  const {
    currentVersion,
    bannerData,
    setCurrentBanner,
    setChartCourseAll,
    setCurrentCourse,
  } = usePage();
  const filteredBanner = bannerData.filter(
    (item) => item.version === currentVersion
  );

  const { serverCurrentCourse } = useUserInfo();

  const handleClickItem = async (id) => {
    try {
      const res = await pageApi.getChartCourse(id);
      setChartCourseAll(res.data);
      setCurrentBanner(id);
      const currentWeaponDetail = res.data.filter(
        (e) => e.weapon.id === serverCurrentCourse
      );
      if (currentWeaponDetail.length > 0) {
        setCurrentCourse(currentWeaponDetail[0].weapon);
      } else {
        setCurrentCourse(null);
      }

      onSuccess();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message)
          toast.error(error.response.data.message);
        else toast.error("internal server error");
      }
    }
  };

  return (
    <div className="flex gap-4 justify-center">
      {filteredBanner.map((e) => (
        <div key={e.id} className="flex justify-center items-center flex-col">
          <img
            src={e.img}
            alt={e.name}
            onClick={() => handleClickItem(e.id)}
            className="w-48 cursor-pointer"
          />
          <div className="w-48">
            <p className="text-xs text-center font-semibold">{e.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
