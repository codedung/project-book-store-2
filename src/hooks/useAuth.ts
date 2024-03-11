import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";

export const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const [resetReqested, setResetReqested] = useState<Boolean>(false);
  const { showAlert } = useAlert();

  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token.accessToken);
        showAlert(res.msg);
        navigate(-1);
      },
      (err) => {
        showAlert(err.response.msg);
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      showAlert("회원가입이 완료되었습니다.");
      navigate("/");
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 변경 되었습니다.");
      navigate("/login");
    });
  };
  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetReqested(true);
    });
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetReqested
  };
};
