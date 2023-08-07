import { useNavigate } from "react-router-dom";

import useSignupSend from "../fetch/useSignupSend";
import useForm from "../hook/useForm";
import useHttpError from "../hook/useHttpError";
import usePageAccess from "../hook/usePageAccess";
import { SignupForm } from "../services/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { send: sendSignup, isLoading } = useSignupSend();
  const { httpError, getHttpError } = useHttpError();
  const { register, onSubmit, errors, isUnsubmittable } = useForm<SignupForm>({
    initialValue: { email: "", password: "" },
  });

  const handleSubmit = async (value: SignupForm) => {
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
          {...register("password", { minLangth: { value: 8, message: "8자 이상 작성해주세요" } })}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button data-testid="signup-button" disabled={isUnsubmittable}>
        회원가입
      </button>
      {isLoading && <p>회원가입 중...</p>}
      {httpError && <p>{httpError.message}</p>}
    </form>
  );
};

export default Signup;
