import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("Title 컴포넌트 테스트", () => {
  it("렌더확인", () => {
    // 1 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large" color="secondary">
          제목
        </Title>
      </BookStoreThemeProvider>
    );
    // 2 확인
    expect(screen.getByText("제목")).toBeInTheDocument();
  });
  it("size props 확인", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="secondary">
          제목
        </Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ fontSize: "2rem" });
  });
  it("color props 확인", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="secondary">
          제목
        </Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ color: "blue" });
  });
});
