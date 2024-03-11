import { getByAltText, render, screen } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "../../models/book.model";

const dummyBook: Book = {
  idx: 1,
  title: "Dummy Book",
  mainImage: "5",
  categoryId: 3,
  category: "소설",
  summary: "Dummy Summary",
  author: "Dummy Author",
  price: 10000,
  likes: 1,
  pubDate: "2021-01-01"
};

describe("book Item Test", () => {
  it("렌더 확인", () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("10,000원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      "src",
      `https://picsum.photos/id/${dummyBook.mainImage}/600/600`
    );
  });
});
