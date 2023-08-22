import { InputHTMLAttributes, forwardRef } from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
interface Props extends InputAttributes {
  label?: string;
  helperMessage?: string;
  testId?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, name, label, helperMessage, testId, onChange, ...defaultProps }, ref) => {
    return (
      <>
        {label && <p>{label}</p>}
        <input ref={ref} name={name} value={value} onChange={onChange} data-testid={testId} {...defaultProps} />
        {helperMessage && <p>{helperMessage}</p>}
      </>
    );
  },
);

Input.displayName = "Input";
export default Input;
