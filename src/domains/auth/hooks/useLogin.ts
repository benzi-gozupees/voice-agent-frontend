import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppDispatch } from "@src/hooks/store";
import { setLogin, setRedirectURL, setUser } from "../slices/auth";
import { login } from "../api/authApi";
import { broadcastLoginEvent } from "@layouts/components/PersistState";
import { LoginRequest, LoginResponse } from "../types";
import { useNavigate } from "react-router-dom";
import store from "@store/store";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (payload: LoginRequest) => {
    const response: LoginResponse | false = await login(payload);

    if (!response) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    const {
      id,
      email,
      company_name,
      contact_number,
      user_profile_image,
      country,
      role,
      status,
      token,
      refresh_token,
    } = response;
    dispatch(
      setLogin({
      token,
      refresh_token,
      role
      })
    );

    // Update user state
    dispatch(
      setUser({
        id,
        email,
        company_name,
        contact_number,
        user_profile_image,
        country,
        role,
        status,
        token,
        refresh_token,
      })
    );
    broadcastLoginEvent();
  };

  return { handleLogin };
};
