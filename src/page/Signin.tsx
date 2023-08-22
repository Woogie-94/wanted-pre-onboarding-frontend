import { useNavigate } from "react-router-dom";

import Button from "../component/common/Button";
import Input from "../component/common/Input";
import useForm from "../hook/useForm";
import useHttpError from "../hook/useHttpError";
import usePageAccess from "../hook/usePageAccess";
import useSigninMutation from "../querys/useSigninMutation";
import { SignupForm } from "../services/auth";

const Signin = () => {
  const navigate = useNavigate();
  const { mutate: sendSignin, isLoading } = useSigninMutation();
  const { httpError, getHttpError } = useHttpError();
  const { register, onSubmit, errors, isUnsubmittable } = useForm<SignupForm>({
    initialValue: { email: "", password: "" },
  });

  const handleSubmit = (value: SignupForm) => {
    sendSignin(value, {
      onSuccess: () => {
        navigate("/todo");
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
      <Button label="로그인" loading={isLoading} disabled={isUnsubmittable} testId="signin-button" />
      {httpError && <p>{httpError.message}</p>}
    </form>
  );
};

export default Signin;
