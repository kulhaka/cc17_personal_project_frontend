import primogem from "../../../assets/primogem.webp";
import useUserInfo from "../../../hooks/useUserInfo";
export default function PrimogemAmount() {
  const { userGem } = useUserInfo();
  return (
    <div>
      <div className="flex gap-1">
        <img src={primogem} width="20" />
        <p>{userGem}</p>
      </div>
    </div>
  );
}
