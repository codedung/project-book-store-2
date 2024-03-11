import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import InputText from "./InputText";
import React from "react";

describe("input text 컴포넌트 테스트", () => {
  it("렌더확인", () => {
    // 1 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="입력하세요"></InputText>
      </BookStoreThemeProvider>
    );
    // 2 확인
    expect(screen.getByPlaceholderText("입력하세요")).toBeInTheDocument();
  });
  it("forwardRef 테스트", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="입력하세요" ref={ref}></InputText>
      </BookStoreThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
