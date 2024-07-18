/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import userInfoApi from "../apis/userInfo";
import { getAccessToken } from "../utils/local-storage";
import { useEffect } from "react";

export const UserInfoContext = createContext();

export default function UserInfoContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userGem, setUserGem] = useState(0);
  const [userIntertwinedFate, setUserIntertwinedFate] = useState(0);
  const [userAcquaintFate, setUserAcquaintFate] = useState(0);
  const [spentCashUser, setSpentCashUser] = useState(0);
  const [spentGemUser, setSpentGemUser] = useState(0);
  const [userStardust, setUserStardust] = useState(0);
  const [userStarglitter, setUserStarglitter] = useState(0);
  const [serverCurrentCourse, setServerCurrentCourse] = useState();

  const fetchUserInfo = async () => {
    try {
      if (getAccessToken()) {
        const res = await userInfoApi.getUserInfo();
        setSpentCashUser(res.data.userData.spentCash);
        setSpentGemUser(res.data.userData.spentPrimogem);
        setUserGem(res.data.userData.gem);
        setUserIntertwinedFate(res.data.userData.intertwinedFate);
        setUserAcquaintFate(res.data.userData.acquaintFate);
        setUserStardust(res.data.userData.stardust);
        setUserStarglitter(res.data.userData.starglitter);
        setServerCurrentCourse(res.data.userData.selectedWeaponId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserInfoContext.Provider
      value={{
        isLoading,
        userGem,
        spentCashUser,
        spentGemUser,
        userIntertwinedFate,
        fetchUserInfo,
        serverCurrentCourse,
        userAcquaintFate,
        userStardust,
        userStarglitter,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}
