/* eslint-disable react/prop-types */
import { useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import Button from "../../components/Button";
import buyingApi from "../../apis/buying";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function FateBuyingSliderModal({
  currency,
  fateType,
  onSuccess,
  userCurrency,
  perFate,
}) {
  const [buyingAmount, setBuyingAmount] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const { fetchUserInfo } = useUserInfo();

  const handleChangeInput = (e) => {
    setBuyingAmount(e.target.value);
  };

  const handleIncrease = () => {
    setBuyingAmount((prev) =>
      Math.min(+prev + 1, Math.floor(+userCurrency / perFate))
    );
  };

  const handleIncreaseStart = () => {
    const id = setInterval(() => handleIncrease(), 100);
    setIntervalId(id);
  };

  const handleDecrease = () => {
    setBuyingAmount((prev) => Math.max(+prev - 1, 1));
  };

  const handleDecreaseStart = () => {
    const id = setInterval(() => handleDecrease(), 100);
    setIntervalId(id);
  };

  const handleButtonRelease = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const camelCaseType = fateType
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  const handleBuy = async () => {
    try {
      const input = {
        currency,
        amount: +buyingAmount,
        type: camelCaseType,
      };
      await buyingApi.fate(input);
      fetchUserInfo();
      onSuccess();
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.data.message) toast.error(err.response.data.message);
        else toast.error("internal server error");
      } else toast.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col px-4 gap-8">
        <div>
          <p className="font-semibold">Amount: {buyingAmount}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrease}
              className="bg-emerald-400 rounded-full pb-1 h-6 w-7 flex items-center justify-center text-white font-bold text-2xl"
              onMouseDown={handleDecreaseStart}
              onMouseUp={handleButtonRelease}
              onMouseLeave={handleButtonRelease}
            >
              -
            </button>
            <input
              type="range"
              className="w-full h-2 rounded-lg cursor-pointer appearance-none bg-gray-200 accent-emerald-400"
              min="1"
              max={Math.floor(userCurrency / perFate)}
              value={buyingAmount}
              onChange={handleChangeInput}
            />
            <button
              onClick={handleIncrease}
              className="bg-emerald-400 rounded-full pb-1 h-6 w-7 flex items-center justify-center text-white font-bold text-2xl"
              onMouseDown={handleIncreaseStart}
              onMouseUp={handleButtonRelease}
              onMouseLeave={handleButtonRelease}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <Button color="white" onClick={() => onSuccess()}>
            Cancel
          </Button>
          <Button color="green" onClick={handleBuy}>
            Buy
          </Button>
        </div>
      </div>
    </>
  );
}
