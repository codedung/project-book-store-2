import {
  BookReviewWrite,
  BookReviewItem as IBookReviewItem
} from "@/models/book.model";
import styled from "styled-components";
import BookReviewItem from "./BookReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface ReviewProps {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewWrite) => void;
}

const BookReview: React.FC<ReviewProps> = ({ reviews, onAdd }) => {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export default BookReview;
