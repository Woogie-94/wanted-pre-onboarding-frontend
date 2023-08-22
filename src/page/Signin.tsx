import { useNavigate } from "react-router-dom";

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
        <p>이메일</p>
        <input
          data-testid="email-input"
          {...register("email", { pattern: { value: "@", message: "이메일 형식이 유효하지 않습니다." } })}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <p>패스워드</p>
        <input
          data-testid="password-input"
          {...register("password", { minLength: { value: 8, message: "8자 이상 작성해주세요" } })}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button data-testid="signin-button" disabled={isUnsubmittable}>
        로그인
      </button>
      {httpError && <p>{httpError.message}</p>}
      {isLoading && <p>로그인 중...</p>}
    </form>
  );
};

export default Signin;
