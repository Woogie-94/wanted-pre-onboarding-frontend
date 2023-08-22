import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  testId: string;
}

const Button = ({ label, testId, disabled = false, onClick, ...defaultProps }: Props) => {
  return (
    <button disabled={disabled} onClick={onClick} data-testid={testId} {...defaultProps}>
      {label}
    </button>
  );
};

export default Button;
