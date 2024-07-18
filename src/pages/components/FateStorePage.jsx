import intertwinedFate from "../../assets/intertwined-fate.webp";
import acquaintFate from "../../assets/acquaint-fate.webp";
import primogem from "../../assets/primogem.webp";
import Store from "../../components/Store";
import Modal from "../../components/Modal";
import { useState } from "react";
import FateBuyingSliderModal from "./FateBuyingSliderModal";
import useUserInfo from "../../hooks/useUserInfo";
import { toast } from "react-toastify";
import usePage from "../../hooks/usePage";

export default function FateStorePage() {
  const [openSlider, setOpenSlider] = useState(false);
  const [fateType, setFateType] = useState("");
  const { userGem } = useUserInfo();
  const { setRenderedPage } = usePage();

  const openBuyingSlider = (fatetype) => {
    if (userGem < 160) {
      toast.error("not enough primogems");
      setRenderedPage(3);
    } else {
      setFateType(fatetype);
      setOpenSlider(true);
    }
  };

  const fateStoreGoods = [
    {
      id: 1,
      name: "Intertwined Fate",
      img: intertwinedFate,
      price: 160,
      currencyImg: primogem,
      currencyName: "primogem",
      onClick: () => openBuyingSlider("Intertwined Fate"),
    },
    {
      id: 2,
      name: "Acquaint Fate",
      img: acquaintFate,
      price: 160,
      currencyImg: primogem,
      currencyName: "primogem",
      onClick: () => openBuyingSlider("Acquaint Fate"),
    },
  ];

  return (
    <div className="ml-52 h-screen px-6 py-4 gap-4">
      <Store itemArr={fateStoreGoods} />
      <Modal
        title={fateType}
        open={openSlider}
        onClose={() => setOpenSlider(false)}
      >
        <FateBuyingSliderModal
          fateType={fateType}
          currency="gem"
          userCurrency={userGem}
          perFate={160}
          onSuccess={() => setOpenSlider(false)}
        />
      </Modal>
    </div>
  );
}
