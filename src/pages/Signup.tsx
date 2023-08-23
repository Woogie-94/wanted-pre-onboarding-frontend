import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import useForm from "../hooks/useForm";
import useHttpError from "../hooks/useHttpError";
import usePageAccess from "../hooks/usePageAccess";
import useSignupMutation from "../querys/useSignupMutation";
import { SignupForm } from "../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: sendSignup, isLoading } = useSignupMutation();
  const { showErrorToast } = useHttpError();
  const { register, onSubmit, errors, isUnsubmittable } = useForm<SignupForm>({
    initialValue: { email: "", password: "" },
  });

  const handleSubmit = (value: SignupForm) => {
    sendSignup(value, {
      onSuccess: () => {
        navigate("/signin");
      },
      onError: showErrorToast,
    });
  };

  usePageAccess();

  return (
    <Wrapper>
      <Content>
        <form onSubmit={onSubmit(handleSubmit)}>
          <InputWrapper>
            <Input
              label="이메일"
              {...register("email", { pattern: { value: "@", message: "이메일 형식이 유효하지 않습니다." } })}
              testId="email-input"
              helperMessage={errors.email}
            />
            <Input
              label="패스워드"
              {...register("password", { minLength: { value: 8, message: "8자 이상 작성해주세요" } })}
              testId="password-input"
              helperMessage={errors.password}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="filled"
              size="large"
              label="회원가입"
              loading={isLoading}
              disabled={isUnsubmittable}
              testId="signup-button"
            />
          </ButtonWrapper>
        </form>
      </Content>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 420px;
  padding-top: 120px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
`;
