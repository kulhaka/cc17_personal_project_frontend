/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateRegister from "../validators/validator-register";
import authApi from "../../../apis/auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const initialInput = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setInput(initialInput);
    setInputError(initialInput);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }
      setInputError(initialInput);
      await authApi.register(input);
      onSuccess();
      toast.success("registered successfully. please log in to continue");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response.data.message === "email is already in use") {
          setInputError((prev) => ({
            ...prev,
            email: "email is already in use",
          }));
        }
        if (error.response.data.message === "username is already in use") {
          setInputError((prev) => ({
            ...prev,
            username: "username is already in use",
          }));
        }
      }
    }
  };

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="username"
            value={input.username}
            name="username"
            onChange={handleChangeInput}
            error={inputError.username}
          />
          <Input
            placeholder="e-mail"
            value={input.email}
            name="email"
            onChange={handleChangeInput}
            error={inputError.email}
          />
          <Input
            placeholder="password"
            value={input.password}
            type="password"
            name="password"
            onChange={handleChangeInput}
            error={inputError.password}
          />
          <Input
            placeholder="confirm password"
            value={input.confirmPassword}
            type="password"
            name="confirmPassword"
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
          />
        </div>
        <div className="flex justify-between">
          <Button color="green" onClick={handleSubmitForm}>
            Register
          </Button>
          <Button color="white" onClick={handleResetForm}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
