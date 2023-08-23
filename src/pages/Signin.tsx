import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import useForm from "../hooks/useForm";
import useHttpError from "../hooks/useHttpError";
import usePageAccess from "../hooks/usePageAccess";
import DefaultLayout from "../layouts/DefaultLayout";
import useSigninMutation from "../querys/useSigninMutation";
import { SignupForm } from "../services/auth";

const Signin = () => {
  const navigate = useNavigate();
  const { mutate: sendSignin, isLoading } = useSigninMutation();
  const { showErrorToast } = useHttpError();
  const { register, onSubmit, errors, isUnsubmittable } = useForm<SignupForm>({
    initialValue: { email: "", password: "" },
  });

  const handleSubmit = (value: SignupForm) => {
    sendSignin(value, {
      onSuccess: () => {
        navigate("/todo");
      },
      onError: showErrorToast,
    });
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  usePageAccess();

  return (
    <DefaultLayout>
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
            label="로그인"
            loading={isLoading}
            disabled={isUnsubmittable}
            testId="signin-button"
          />
          <Button type="text" size="large" label="회원가입하러 가기" onClick={handleSignupClick} />
        </ButtonWrapper>
      </form>
    </DefaultLayout>
  );
};

export default Signin;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;
