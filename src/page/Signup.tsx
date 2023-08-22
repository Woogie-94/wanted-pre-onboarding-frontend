import { useNavigate } from "react-router-dom";

import Button from "../component/common/Button";
import Input from "../component/common/Input";
import useForm from "../hook/useForm";
import useHttpError from "../hook/useHttpError";
import usePageAccess from "../hook/usePageAccess";
import useSignupMutation from "../querys/useSignupMutation";
import { SignupForm } from "../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: sendSignup, isLoading } = useSignupMutation();
  const { httpError, getHttpError } = useHttpError();
  const { register, onSubmit, errors, isUnsubmittable } = useForm<SignupForm>({
    initialValue: { email: "", password: "" },
  });

  const handleSubmit = (value: SignupForm) => {
    sendSignup(value, {
      onSuccess: () => {
        navigate("/signin");
      },
      onError: getHttpError,
    });
  };

  usePageAccess();

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <div style={{ marginBottom: 12 }}>
        <Input
          label="이메일"
          {...register("email", { pattern: { value: "@", message: "이메일 형식이 유효하지 않습니다." } })}
          testId="email-input"
          helperMessage={errors.email}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <Input
          label="패스워드"
          {...register("password", { minLength: { value: 8, message: "8자 이상 작성해주세요" } })}
          testId="password-input"
          helperMessage={errors.password}
        />
      </div>
      <Button label="회원가입" disabled={isUnsubmittable} testId="signup-button" />
      {isLoading && <p>회원가입 중...</p>}
      {httpError && <p>{httpError.message}</p>}
    </form>
  );
};

export default Signup;
