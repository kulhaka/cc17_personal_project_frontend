import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import RegisterForm from "./RegisterForm";
import validateLogin from "../validators/validator-login";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserInfoContext } from "../../../contexts/UserInfoContext";

const initialInput = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [openModal, setOpenModal] = useState(false);

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);

  const { login } = useAuth();

  const navigate = useNavigate();

  const { fetchUserInfo } = useContext(UserInfoContext);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        setInputError(error);
        return;
      }
      setInputError(initialInput);

      await login(input);
      await fetchUserInfo();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <div className="grid gap-4">
          <div className="font-bold text-center text-xl">
            Genshin Impact Wish Simulator
          </div>
          <div>
            <Input
              placeholder={"username"}
              name="username"
              onChange={handleChangeInput}
              value={input.username}
              error={inputError.username}
            />
          </div>
          <div>
            <Input
              placeholder={"password"}
              type="password"
              name="password"
              onChange={handleChangeInput}
              value={input.password}
              error={inputError.password}
            />
          </div>
          <div className="flex justify-between">
            <Button color="green">Login</Button>
            <Button
              color="white"
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </form>
      <Modal
        title="Register"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <RegisterForm onSuccess={() => setOpenModal(false)} />
      </Modal>
    </>
  );
}
