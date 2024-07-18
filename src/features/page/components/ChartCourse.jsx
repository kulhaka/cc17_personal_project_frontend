/* eslint-disable react/prop-types */
import pageApi from "../../../apis/page";
import useAuth from "../../../hooks/useAuth";
import usePage from "../../../hooks/usePage";

export default function ChartCourse({ onSuccess }) {
  const { authUser } = useAuth();
  const { chartCourseAll, setCurrentCourse } = usePage();

  const handleClickItem = async (item) => {
    setCurrentCourse(item);
    const submitCourse = {
      userId: authUser.id,
      weaponId: item.id,
    };
    await pageApi.setCourse(submitCourse);
    onSuccess();
  };

  return (
    <div className="flex gap-24 justify-center">
      {chartCourseAll.map((e) => (
        <div key={e.id} className="flex w-24 flex-col">
          <img
            src={e.weapon.iconImg}
            alt={e.weapon.name}
            onClick={() => handleClickItem(e.weapon)}
            className="w-24 cursor-pointer"
          />
          <div className="w-24">
            <p className="text-xs text-center font-semibold">{e.weapon.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
