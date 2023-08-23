import { InputHTMLAttributes, forwardRef } from "react";
import { styled } from "styled-components";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
interface Props extends InputAttributes {
  label?: string;
  helperMessage?: string;
  testId?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, name, label, helperMessage, testId, onChange, ...defaultProps }, ref) => {
    return (
      <Wrapper>
        {label && (
          <LabelWrapper>
            <Label>{label}</Label>
          </LabelWrapper>
        )}
        <BaseInput
          $hasError={!!helperMessage}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          data-testid={testId}
          autoComplete="off"
          {...defaultProps}
        />
        {helperMessage && (
          <HelperMessageWrapper>
            <HelperMessage>{helperMessage}</HelperMessage>
          </HelperMessageWrapper>
        )}
      </Wrapper>
    );
  },
);

Input.displayName = "Input";
export default Input;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;
const BaseInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  font-size: 16px;
  color: #3b3c42;
  padding: 10px;
  background-color: #f8f8fa;
  border-radius: 8px;
  border: 1px solid ${props => (props.$hasError ? "#e94f4b" : "#f8f8fa")};
  transition: 0.3s;

  &:focus-within {
    border: 1px solid ${props => (props.$hasError ? "#e94f4b" : "#ebebee")};
  }
  &:hover {
    border: 1px solid ${props => (props.$hasError ? "#e94f4b" : "#ebebee")};
  }
`;
const LabelWrapper = styled.div`
  margin-bottom: 8px;
`;
const Label = styled.p`
  font-size: 14px;
  color: #3b3c42;
`;
const HelperMessageWrapper = styled.div`
  margin-top: 8px;
`;
const HelperMessage = styled.p`
  font-size: 14px;
  color: #e94f4b;
`;
