import HomePage from "./components/HomePage";
import usePage from "../hooks/usePage";
import FateStorePage from "./components/FateStorePage";
import PrimoStorePage from "./components/PrimogemStore";
import WelkinStore from "./components/WelkinStore";
import StarStore from "./components/StarStore";
import EditProfile from "./components/EditProfile";

export default function PageContainer() {
  const { renderedPage } = usePage();

  return (
    <>
      {renderedPage === 1 && <HomePage />}
      {renderedPage === 2 && <FateStorePage />}
      {renderedPage === 3 && <PrimoStorePage />}
      {renderedPage === 4 && <WelkinStore />}
      {renderedPage === 5 && <StarStore />}
      {renderedPage === 6 && <EditProfile />}
    </>
  );
}
