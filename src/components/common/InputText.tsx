import React, { ForwardedRef } from "react";
import styled from "styled-components";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "radio"
  | "checkbox";

interface iInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: InputType;
}
const InputText = React.forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: iInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        placeholder={placeholder}
        type={inputType}
        ref={ref}
        onChange={onChange}
        {...props}
      ></InputTextStyle>
    );
  }
);

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;
export default InputText;
