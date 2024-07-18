import useUserInfo from "../../hooks/useUserInfo";
import stardust from "../../assets/stardust.webp";
import starglitter from "../../assets/starglitter.webp";
import intertwinedFate from "../../assets/intertwined-fate.webp";
import acquaintFate from "../../assets/acquaint-fate.webp";
import Store from "../../components/Store";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import FateBuyingSliderModal from "./FateBuyingSliderModal";

export default function StarStore() {
  const [openSlider, setOpenSlider] = useState(false);
  const [fateType, setFateType] = useState("");
  const [currencyType, setCurrencyType] = useState(0);
  const { userStardust, userStarglitter } = useUserInfo();

  const openBuyingSlider = (fatetype, currencyType) => {
    if (currencyType === 1) {
      if (userStarglitter < 5) {
        toast.error("not enough masterless starglitter");
      } else {
        setCurrencyType(1);
        setFateType(fatetype);
        setOpenSlider(true);
      }
    } else {
      if (userStardust < 75) {
        toast.error("not enough masterless stardust");
      } else {
        setCurrencyType(2);
        setFateType(fatetype);
        setOpenSlider(true);
      }
    }
  };

  const starStoreGoods = [
    {
      id: 1,
      name: "Intertwined Fate",
      img: intertwinedFate,
      price: 5,
      currencyImg: starglitter,
      currencyName: "Masterless Starglitter",
      onClick: () => {
        openBuyingSlider("Intertwined Fate", 1);
      },
    },
    {
      id: 2,
      name: "Acquaint Fate",
      img: acquaintFate,
      price: 5,
      currencyImg: starglitter,
      currencyName: "Masterless Starglitter",
      onClick: () => {
        openBuyingSlider("Acquaint Fate", 1);
      },
    },
    {
      id: 3,
      name: "Intertwined Fate",
      img: intertwinedFate,
      price: 75,
      currencyImg: stardust,
      currencyName: "Masterless Stardust",
      onClick: () => {
        openBuyingSlider("Intertwined Fate", 2);
      },
    },
    {
      id: 4,
      name: "Acquaint Fate",
      img: acquaintFate,
      price: 75,
      currencyImg: stardust,
      currencyName: "Masterless Stardust",
      onClick: () => {
        openBuyingSlider("Acquaint Fate", 2);
      },
    },
  ];

  return (
    <div className="flex flex-col ml-52 h-screen px-6 py-4 gap-6">
      <div className="flex w-1/4">
        <div className="flex gap-1 w-1/2 text-black text-sm font-semibold">
          <div className="flex flex-nowrap">
            <img src={starglitter} alt="starglitter" width="20" />
          </div>
          <p>{userStarglitter}</p>
        </div>
        <div className="flex gap-1 w-1/2 text-black text-sm font-semibold ">
          <div className="flex flex-nowrap">
            <img src={stardust} alt="stardust" width="20" />
          </div>
          <p>{userStardust}</p>
        </div>
      </div>
      <Store itemArr={starStoreGoods} />
      <Modal
        title={fateType}
        open={openSlider}
        onClose={() => setOpenSlider(false)}
      >
        {currencyType === 1 ? (
          <FateBuyingSliderModal
            fateType={fateType}
            currency="starglitter"
            userCurrency={userStarglitter}
            perFate={5}
            onSuccess={() => setOpenSlider(false)}
          />
        ) : (
          <FateBuyingSliderModal
            fateType={fateType}
            currency="stardust"
            userCurrency={userStardust}
            perFate={75}
            onSuccess={() => setOpenSlider(false)}
          />
        )}
      </Modal>
    </div>
  );
}
