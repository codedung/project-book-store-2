import { SignupStyle } from "./Signup";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export interface LoginProps {
  id: string;
  password: string;
}

const Login: React.FC = () => {
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginProps>();
  const onSubmit = (data: LoginProps) => {
    userLogin(data);
  };
  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="아이디"
              inputType="text"
              {...register("id", { required: true })}
              inputMode="text"
            />
            {errors.id && <p className="error-text">아이디를 입력해주세요</p>}
          </fieldset>
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
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export default Login;
