import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookItem, { BookItemStyle } from "./BookItem";

interface BookBestItemProps {
  book: Book;
  itemIntex: number;
}
const BookBestItem: React.FC<BookBestItemProps> = ({ book, itemIntex }) => {
  return (
    <BookBestItemStyle>
      <BookItem book={book} view="grid" />
      <div className="rank">{itemIntex + 1}</div>
    </BookBestItemStyle>
  );
};

const BookBestItemStyle = styled.div`
  ${BookItemStyle} {
    .summary,
    .price,
    .likes {
      display: none;
    }

    h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  position: relative;
  .rank {
    position: absolute;
    left: -10px;
    top: -10px;
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.color.primary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    font-style: italic;
  }
`;

export default BookBestItem;
