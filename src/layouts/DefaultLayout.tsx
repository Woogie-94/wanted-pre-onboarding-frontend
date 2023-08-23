import { ReactNode } from "react";
import { styled } from "styled-components";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default DefaultLayout;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 420px;
  padding-top: 120px;
`;
