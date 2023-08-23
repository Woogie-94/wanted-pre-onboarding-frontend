import { css, styled } from "styled-components";

import { useToastContext } from "../../contexts/toastContext";

const Toast = () => {
  const toast = useToastContext();

  return (
    <>
      {toast && (
        <Wrapper $type={toast.type}>
          <p>{toast.message}</p>
        </Wrapper>
      )}
    </>
  );
};

export default Toast;

const Wrapper = styled.div<{ $type: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  padding: 12px;
  font-size: 12px;
  color: #fff;
  background-color: #2b2c2e;
  border-radius: 8px;
  transition: all 0.5s;

  ${({ $type }) => {
    switch ($type) {
      case "add":
        return css`
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        `;
      case "dismiss":
        return css`
          opacity: 1;
          transform: translateX(-50%) translateY(30px);
        `;
      case "remove":
        return css`
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        `;
    }
  }}
`;
