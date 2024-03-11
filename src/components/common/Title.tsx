import React from "react";
import { styled } from "styled-components";
import { ColorsKey, HeadingSize } from "../../style/theme";
import Button from "./Button";

export interface iTitleProps {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorsKey;
}

const Title: React.FC<iTitleProps> = ({ children, size, color }) => {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
};

const TitleStyle = styled.h1<Omit<iTitleProps, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.primary};
`;
export default Title;
