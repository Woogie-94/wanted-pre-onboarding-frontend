import useForm from "../hook/useForm";

interface SignupForm {
  email: string;
  password: string;
}

const Signup = () => {
  const { register, onSubmit, errors, isUnsubmittable } = useForm<SignupForm>({
    initialValue: { email: "", password: "" },
  });

  const handleSubmit = async (value: SignupForm) => {};

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
    </form>
  );
};

export default Signup;
