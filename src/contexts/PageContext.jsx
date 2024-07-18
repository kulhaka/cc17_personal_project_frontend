/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import pageApi from "../apis/page";
import wishApi from "../apis/wish";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const PageContext = createContext();

export default function PageContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]);
  const [currentVersion, setCurrentVersion] = useState("");
  const [currentBanner, setCurrentBanner] = useState(1);
  const [rollResult, setRollResult] = useState([]);
  const [chartCourseAll, setChartCourseAll] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [rollHistory, setRollHistory] = useState([]);
  const [renderedPage, setRenderedPage] = useState(1);
  const [sixtyBonus, setSixtyBonus] = useState(true);
  const [threeHundredBonus, setThreeHundredBonus] = useState(true);
  const [nineEigthyBonus, setNineEigthyBonus] = useState(true);
  const [thousandNineEightyBonus, setThousandNineEightyBonus] = useState(true);
  const [threeThousandBonus, setThreeThousandBonus] = useState(true);
  const [sixThousandBonus, setSixThousandBonus] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const res = await pageApi.getBannerInfo();
        setBannerData(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  const wish = async (wishData) => {
    try {
      const res = await wishApi.wish(wishData);
      setRollResult(res.data.rollResult);
      const getChartCourse = res.data.rollResult.filter(
        (item) => item.weapon?.id === currentCourse?.id
      );
      if (getChartCourse.length > 0) {
        setCurrentCourse(null);
      }
      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
          if (error.response.data.message.includes("not enough")) {
            setRenderedPage(2);
          }
        } else toast.error("internal server error");
      }
    }
  };

  const getRollHistory = async () => {
    try {
      const res = await pageApi.getRollHistory();
      setRollHistory(res.data.rollHistory);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContext.Provider
      value={{
        isLoading,
        bannerData,
        currentBanner,
        setCurrentBanner,
        setCurrentVersion,
        currentVersion,
        wish,
        rollResult,
        chartCourseAll,
        setChartCourseAll,
        currentCourse,
        setCurrentCourse,
        rollHistory,
        setRollHistory,
        getRollHistory,
        renderedPage,
        setRenderedPage,
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
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
