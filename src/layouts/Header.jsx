import { Link } from "react-router-dom";
import NumberBox from "../components/NumberBox";
import AmountSpent from "../features/userinfo/components/AmountSpent";
import PrimogemAmount from "../features/userinfo/components/PrimogemAmount";
import FateAmount from "../features/userinfo/components/FateAmount";
import Dropdown from "../components/Dropdown";
import useAuth from "../hooks/useAuth";
import usePage from "../hooks/usePage";

export default function Header() {
  const { authUser, logout } = useAuth();
  const { setRenderedPage } = usePage();

  const handleItemClick = (item) => {
    if (item === "Edit Profile") {
      setRenderedPage(6);
    }
    if (item === "Logout") {
      logout();
      window.location.reload();
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-black p-2 min-h-10 text-white grid grid-flow-col auto-cols-auto gap-2 ">
      <div className="font-semibold max-md:hidden flex items-center">
        <Link to="/">Genshin Impact Wishing Simulator</Link>
      </div>
      <div className="flex items-center">
        <NumberBox>
          <AmountSpent />
        </NumberBox>
      </div>
      <div className="flex items-center">
        <NumberBox>
          <PrimogemAmount />
        </NumberBox>
      </div>
      <div className="flex items-center">
        <NumberBox>
          <FateAmount />
        </NumberBox>
      </div>

      <div className="flex items-center justify-end">
        <Dropdown
          color="black"
          items={["Edit Profile", "Logout"]}
          onItemClick={handleItemClick}
          name={authUser?.username}
          width="40"
        />
      </div>
    </header>
  );
}
