import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import usePage from "../../hooks/usePage";
import Modal from "../../components/Modal";
import VersionBanner from "../../features/page/components/VersionBanner";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import RollResult from "../../features/page/components/RollResult";
import ChartCourse from "../../features/page/components/ChartCourse";
import { BANNER_TYPE } from "../../constants";
import WishHistory from "../../features/page/components/WishHistory";
import useUserInfo from "../../hooks/useUserInfo";

export default function HomePage() {
  const [openChartCourse, setOpenChartCourse] = useState(false);
  const [openVersionModal, setOpenVersionModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const {
    bannerData,
    setCurrentVersion,
    currentBanner,
    wish,
    currentCourse,
    getRollHistory,
  } = usePage();

  const { fetchUserInfo } = useUserInfo();

  const uniqueVersion = [...new Set(bannerData.map((item) => item.version))];

  const handleItemClick = (version) => {
    setCurrentVersion(version);
    setOpenVersionModal(true);
  };

  const isWeaponBanner = bannerData.filter(
    (item) => item.type === BANNER_TYPE.WEAPON && item.id === currentBanner
  );

  const submitWish = async (amount) => {
    try {
      const wishData = {
        amount: amount,
        bannerId: currentBanner,
      };
      const res = await wish(wishData);
      fetchUserInfo();
      if (res) setOpenResultModal(true);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message)
          toast.error(error.response.data.message);
        else toast.error("internal server error");
      }
    }
  };

  const handleOpenWishHistory = () => {
    getRollHistory();
    setOpenHistoryModal(true);
  };

  return (
    <>
      <div className="ml-52 h-screen px-6 py-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex justify-between gap-2">
            <Dropdown
              color="green"
              items={uniqueVersion}
              onItemClick={handleItemClick}
              name="Version"
              position="left"
            />
            {isWeaponBanner.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  color="green"
                  fontSize="sm"
                  padding="small"
                  width="auto"
                  onClick={() => setOpenChartCourse(true)}
                >
                  Epitomised Path
                </Button>
                <p className="font-semibold">{currentCourse?.name}</p>
              </div>
            )}
          </div>
          <Button
            color="green"
            fontSize="sm"
            padding="small"
            width="auto"
            onClick={handleOpenWishHistory}
          >
            Wishing History
          </Button>
        </div>
        <div className="flex justify-center item-center">
          <img
            src={bannerData.filter((e) => e.id === currentBanner)[0]?.img}
            alt="Banner"
            style={{ width: "640px" }}
          />
        </div>
        <div className="flex justify-evenly px-16">
          <Button color="green" onClick={() => submitWish(1)}>
            1 Wish
          </Button>
          <Button color="green" onClick={() => submitWish(10)}>
            10 Wish
          </Button>
        </div>
      </div>
      <Modal
        title="Epitomised Path"
        open={openChartCourse}
        onClose={() => setOpenChartCourse(false)}
      >
        <ChartCourse onSuccess={() => setOpenChartCourse(false)} />
      </Modal>
      <Modal
        width="40"
        title="Banners"
        open={openVersionModal}
        onClose={() => setOpenVersionModal(false)}
      >
        <VersionBanner onSuccess={() => setOpenVersionModal(false)} />
      </Modal>
      <Modal
        width="64"
        title="Result"
        open={openResultModal}
        onClose={() => setOpenResultModal(false)}
      >
        <RollResult />
      </Modal>
      <Modal
        overflow="auto"
        width="48"
        title="Wishing History"
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
      >
        <WishHistory />
      </Modal>
    </>
  );
}
