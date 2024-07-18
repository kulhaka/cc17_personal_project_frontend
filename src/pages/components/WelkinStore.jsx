import { AxiosError } from "axios";
import primogem from "../../assets/primogem.webp";
import Store from "../../components/Store";
import { toast } from "react-toastify";
import buyingApi from "../../apis/buying";
import useUserInfo from "../../hooks/useUserInfo";

export default function WelkinStore() {
  const { fetchUserInfo } = useUserInfo();

  const handleWelkin = async () => {
    try {
      const input = {
        amount: 3000,
        price: 179,
        bonus: false,
      };
      await buyingApi.gem(input);
      fetchUserInfo();
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.data.message) toast.error(err.response.data.message);
        else toast.error("internal server error");
      } else toast.error(err);
    }
  };

  const welkin = [
    {
      id: 1,
      name: "Blessing of the Welkin Moon (3000 Primogems)",
      img: primogem,
      price: 179,
      currencyName: "THB",
      onClick: handleWelkin,
    },
  ];

  return (
    <div className="ml-52 h-screen px-6 py-4">
      <div className="pb-4">
        <p className="font-bold">
          ***Assuming all 30-day login bonuses are received***
        </p>
      </div>
      <Store itemArr={welkin} />
    </div>
  );
}
