import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import authApi from "../../apis/auth";
import validateEdit from "../../features/authenication/validators/validator-edit";
import useAuth from "../../hooks/useAuth";

export default function EditProfile() {
  const initialInput = {
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
  };

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const { authUser, setAuthUser } = useAuth();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleResetForm = (e) => {
    e.preventDefault();
    setInput(initialInput);
    setInputError(initialInput);
  };

  const handleClearInput = (...targets) => {
    const newInput = { ...input };
    targets.map((target) => {
      newInput[target] = "";
    });
    setInput(newInput);
  };

  const handleClearInputError = (...targets) => {
    const newInputError = { ...inputError };
    targets.map((target) => {
      newInputError[target] = "";
    });
    setInputError(newInputError);
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      if (!input.email && !input.password) {
        return toast.error("no update information");
      }
      const error = validateEdit(input);
      if (error) {
        return setInputError(error);
      }
      setInputError(initialInput);
      const res = await authApi.editProfile(input);
      setAuthUser(res.data.userData);
      toast.success("profile updated");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message)
          toast.error(error.response.data.message);
        else toast.error("internal server error");
      }
    }
  };

  return (
    <div className="ml-52 h-screen px-6 py-4">
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex h-11 items-center">
              <p className="font-semibold">Username: {authUser.username}</p>
            </div>
            <div className="flex items-center">
              {editEmail ? (
                <div className="flex gap-4 h-full items-center">
                  <Input
                    width="80"
                    placeholder={authUser.email}
                    value={input.email}
                    name="email"
                    onChange={handleChangeInput}
                    error={inputError.email}
                  />
                  <Button
                    color="black"
                    onClick={() => {
                      handleClearInput("email");
                      handleClearInputError("email");
                      setEditEmail(false);
                    }}
                    width="16"
                    padding="small"
                    fontSize="sm"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-4 items-center h-full">
                  <p className="font-semibold">Email: {authUser.email}</p>
                  <Button
                    color="black"
                    onClick={() => setEditEmail(true)}
                    width="16"
                    padding="small"
                    fontSize="sm"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
            <div className="flex h-auto items-center">
              {editPassword ? (
                <div className="flex flex-col gap-4 h-full">
                  <Input
                    width="80"
                    placeholder="new password"
                    value={input.password}
                    type="password"
                    name="password"
                    onChange={handleChangeInput}
                    error={inputError.password}
                  />
                  <Input
                    width="80"
                    placeholder="confirm new password"
                    value={input.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    onChange={handleChangeInput}
                    error={inputError.confirmPassword}
                  />
                  <Button
                    color="black"
                    onClick={() => {
                      handleClearInput("password", "confirmPassword");
                      handleClearInputError("password", "confirmPassword");
                      setEditPassword(false);
                    }}
                    width="16"
                    padding="small"
                    fontSize="sm"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Button
                    color="black"
                    onClick={() => setEditPassword(true)}
                    width="full"
                    padding="small"
                    fontSize="sm"
                  >
                    Change Password
                  </Button>
                </div>
              )}
            </div>
            <div className="flex h-11 items-center">
              <div className="flex h-11 items-center gap-4">
                <p className="font-semibold">
                  {input.password ? "Current password:" : "Password:"}
                </p>
                <Input
                  width="80"
                  placeholder={input.password ? "current password" : "password"}
                  value={input.currentPassword}
                  type="password"
                  name="currentPassword"
                  onChange={handleChangeInput}
                  error={inputError.currentPassword}
                />
              </div>
            </div>
          </div>
          <div className="flex pt-4 gap-8">
            <Button color="green" onClick={handleSubmitForm}>
              Submit
            </Button>
            <Button color="white" onClick={handleResetForm}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
