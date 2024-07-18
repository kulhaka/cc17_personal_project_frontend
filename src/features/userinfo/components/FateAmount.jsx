import intertwinedFate from "../../../assets/intertwined-fate.webp";
import acquaintFate from "../../../assets/acquaint-fate.webp";
import useUserInfo from "../../../hooks/useUserInfo";

export default function FateAmount() {
  const { userIntertwinedFate, userAcquaintFate } = useUserInfo();
  return (
    <div>
      <div className="flex">
        <div className="flex w-1/2">
          <img src={intertwinedFate} width="20" />
          <p>{userIntertwinedFate}</p>
        </div>
        <div className="flex w-1/2">
          <img src={acquaintFate} width="20" />
          <p>{userAcquaintFate}</p>
        </div>
      </div>
    </div>
  );
}
