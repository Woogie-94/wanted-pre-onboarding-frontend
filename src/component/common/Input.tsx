import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  helperMessage?: string;
  testId?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
