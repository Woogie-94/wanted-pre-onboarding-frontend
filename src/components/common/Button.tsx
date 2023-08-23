import { ButtonHTMLAttributes } from "react";
import { keyframes, styled } from "styled-components";

type Type = "filled" | "text";
type Size = "large" | "medium";
type ButtonHtmlAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
interface Props extends Omit<ButtonHtmlAttributes, "type"> {
  type: Type;
  size: Size;
  label: string;
  fitContent?: boolean;
  testId?: string;
  loading?: boolean;
}

const Button = ({
  type,
  size,
  label,
  fitContent = false,
  testId,
  loading,
  disabled = false,
  onClick,
  ...defaultProps
}: Props) => {
  return (
    <BaseButton
      $type={type}
      $size={size}
      $fitContent={fitContent}
      disabled={disabled}
      onClick={onClick}
      data-testid={testId}
      {...defaultProps}
    >
      {loading && (
        <LoadingSpinner>
          <div />
          <div />
          <div />
        </LoadingSpinner>
      )}
      <Label $isVisible={!loading}>{label}</Label>
    </BaseButton>
  );
};

export default Button;

const BaseButton = styled.button<{ $type: Type; $size: Size; disabled?: boolean; $fitContent: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $fitContent }) => ($fitContent ? "fit-content" : "100%")};
  padding: ${({ $size }) => ($size === "large" ? "16px" : "12px")};
  font-size: 14px;
  color: ${({ $type }) => ($type === "filled" ? "#fff" : "#3b3c42")};
  background-color: ${({ $type }) => ($type === "filled" ? "#5a41f5" : "transparent")};
  border-radius: 8px;
  transition: 0.2s;

  &:disabled {
    color: #3b3c42;
    background-color: #f4f4f7;
  }

  &:hover {
    &:not(:disabled) {
      background-color: ${({ $type }) => ($type === "filled" ? "#513BDD" : "#f4f4f790")};
    }
  }

  &:active {
    &:not(:disabled) {
      background-color: ${({ $type }) => ($type === "filled" ? "#513BDD" : "#f4f4f790")};
    }
  }
`;

const Label = styled.p<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
`;

const spinAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }`;

const LoadingSpinner = styled.div<{ color?: string }>`
  position: absolute;

  & > div {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: ${spinAnimation} 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.3s;
    }
    &:nth-child(2) {
      animation-delay: -0.2s;
    }
    &:nth-child(3) {
      animation-delay: -0.1s;
    }
  }
`;
