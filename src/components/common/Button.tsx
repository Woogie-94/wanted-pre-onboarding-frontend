import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  testId: string;
  loading?: boolean;
}

const Button = ({ label, testId, loading, disabled = false, onClick, ...defaultProps }: Props) => {
  return (
    <button disabled={disabled || loading} onClick={onClick} data-testid={testId} {...defaultProps}>
      {loading ? <p>loading</p> : label}
    </button>
  );
};

export default Button;
