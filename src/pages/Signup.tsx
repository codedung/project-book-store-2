import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export interface SignupProps {
  id: string;
  password: string;
  name: string;
}

const Signup: React.FC = () => {
  const { userSignup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupProps>();
  const onSubmit = (data: SignupProps) => {
    userSignup(data);
  };

  return (
    <>
      <Title size="large">회원가입</Title>
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
            <InputText
              placeholder="이름"
              inputType="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="error-text">이름을 입력해주세요</p>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
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

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding-bottom: 8px;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }
  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding-top: 16px;
  }
`;

export default Signup;
