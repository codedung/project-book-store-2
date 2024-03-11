import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookItem from "../books/BookItem";

interface NewBooksProps {
  books: Book[];
}

const MainNewBooks: React.FC<NewBooksProps> = ({ books }) => {
  return (
    <MainNewBooksStyle>
      {books.map((book) => (
        <BookItem book={book} view="grid" key={book.idx} />
      ))}
    </MainNewBooksStyle>
  );
};

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainNewBooks;
