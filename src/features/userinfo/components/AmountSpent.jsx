import primogem from "../../../assets/primogem.webp";
import useUserInfo from "../../../hooks/useUserInfo";
export default function AmountSpent() {
  const { spentCashUser, spentGemUser } = useUserInfo();
  return (
    <div>
      <div className="flex">
        <div className="w-40">
          <p className="font-bold">Amount Spent:</p>
        </div>
        <div className="flex w-full">
          <div className="flex w-1/2 gap-1">
            <p className="font-bold">THB</p>
            <p>{spentCashUser}</p>
          </div>
          <div className="flex w-1/2 gap-1">
            <img src={primogem} width="20" />
            <p>{spentGemUser}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
