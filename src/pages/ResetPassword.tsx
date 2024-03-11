import { SignupProps, SignupStyle } from "./Signup";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
const ResetPassword: React.FC = () => {
  const { userResetPassword, userResetRequest, resetReqested } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    resetReqested ? userResetPassword(data) : userResetRequest(data);
  };
  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="아이디"
              inputType="text"
              {...register("id", { required: true })}
            />
            {errors.id && <p className="error-text">아이디를 입력해주세요</p>}
          </fieldset>
          {resetReqested && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetReqested ? "비밀번호 초기화" : "초기화 요청"}
            </Button>
          </fieldset>
        </form>
      </SignupStyle>
    </>
  );
};

export default ResetPassword;
