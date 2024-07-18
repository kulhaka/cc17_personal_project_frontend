/* eslint-disable no-unused-vars */
import { useState } from "react";
import primogem from "../../assets/primogem.webp";
import Store from "../../components/Store";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import buyingApi from "../../apis/buying";
import useUserInfo from "../../hooks/useUserInfo";
import usePage from "../../hooks/usePage";

export default function PrimoStorePage() {
  const { fetchUserInfo } = useUserInfo();
  const {
    sixtyBonus,
    setSixtyBonus,
    threeHundredBonus,
    setThreeHundredBonus,
    nineEigthyBonus,
    setNineEigthyBonus,
    thousandNineEightyBonus,
    setThousandNineEightyBonus,
    threeThousandBonus,
    setThreeThousandBonus,
    sixThousandBonus,
    setSixThousandBonus,
  } = usePage();

  const disableBonus = () => {
    setSixtyBonus(false);
    setThreeHundredBonus(false);
    setNineEigthyBonus(false);
    setThousandNineEightyBonus(false);
    setThreeThousandBonus(false);
    setSixThousandBonus(false);
  };

  const enableBonus = () => {
    setSixtyBonus(true);
    setThreeHundredBonus(true);
    setNineEigthyBonus(true);
    setThousandNineEightyBonus(true);
    setThreeThousandBonus(true);
    setSixThousandBonus(true);
  };

  const handleBuy = async (price, name, bonus, bonusFn) => {
    try {
      const amount = +name.split(" ")[0];
      const input = {
        amount,
        price,
        bonus,
      };
      if (bonus) {
        bonusFn(false);
        toast.success("2x bonus");
      }
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

  const primogemStoreGoods = [
    {
      id: 1,
      name: "60 Primogems",
      img: primogem,
      price: 35,
      currencyName: "THB",
      bonus: sixtyBonus,
      bonusFn: setSixtyBonus,
    },
    {
      id: 2,
      name: `300 Primogems ${threeHundredBonus ? "" : "+ 30 Primogems"}`,
      img: primogem,
      price: 179,
      currencyName: "THB",
      bonus: threeHundredBonus,
      bonusFn: setThreeHundredBonus,
    },
    {
      id: 3,
      name: `980 Primogems ${nineEigthyBonus ? "" : "+ 110 Primogems"}`,
      img: primogem,
      price: 549,
      currencyName: "THB",
      bonus: nineEigthyBonus,
      bonusFn: setNineEigthyBonus,
    },
    {
      id: 4,
      name: `1980 Primogems ${
        thousandNineEightyBonus ? "" : "+ 260 Primogems"
      }`,
      img: primogem,
      price: 1100,
      currencyName: "THB",
      bonus: thousandNineEightyBonus,
      bonusFn: setThousandNineEightyBonus,
    },
    {
      id: 5,
      name: `3280 Primogems ${threeThousandBonus ? "" : "+ 600 Primogems"}`,
      img: primogem,
      price: 1800,
      currencyName: "THB",
      bonus: threeThousandBonus,
      bonusFn: setThreeThousandBonus,
    },
    {
      id: 6,
      name: `6480 Primogems ${sixThousandBonus ? "" : "+ 1600 Primogems"}`,
      img: primogem,
      price: 3700,
      currencyName: "THB",
      bonus: sixThousandBonus,
      bonusFn: setSixThousandBonus,
    },
  ];

  return (
    <div className="ml-52 h-screen px-6 py-4 gap-4">
      <div className="flex flex-col pb-4 gap-4">
        <div className="flex gap-4">
          <Button
            color={
              sixtyBonus === false &&
              threeHundredBonus === false &&
              nineEigthyBonus === false &&
              thousandNineEightyBonus === false &&
              threeThousandBonus === false &&
              sixThousandBonus === false
                ? "disabled"
                : "green"
            }
            onClick={disableBonus}
          >
            Disable All First Time x2 Bonus
          </Button>
          <Button
            color={
              sixtyBonus === true &&
              threeHundredBonus === true &&
              nineEigthyBonus === true &&
              thousandNineEightyBonus === true &&
              threeThousandBonus === true &&
              sixThousandBonus === true
                ? "disabled"
                : "green"
            }
            onClick={enableBonus}
          >
            Enable All First Time x2 Bonus
          </Button>
        </div>
        <div>
          <p className="font-bold">
            ***Assuming all Genesis Crystals are converted to Primogems,
            including all bonuses***
          </p>
        </div>
      </div>

      <Store
        itemArr={primogemStoreGoods.map((item) => ({
          ...item,
          onClick: () =>
            handleBuy(item.price, item.name, item.bonus, item.bonusFn),
        }))}
      />
    </div>
  );
}
