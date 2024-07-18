/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import pageApi from "../../../apis/page";
import Button from "../../../components/Button";
import useUserInfo from "../../../hooks/useUserInfo";

export default function ResetConfirmation({ onSuccess }) {
  const { fetchUserInfo } = useUserInfo();

  const handleReset = async () => {
    try {
      await pageApi.deleteRollHistory();
      toast.success("All wish history and currencies have been reset");
      fetchUserInfo();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between">
      <Button color="white" onClick={() => onSuccess()}>
        No
      </Button>
      <Button color="green" onClick={() => handleReset()}>
        Yes
      </Button>
    </div>
  );
}
