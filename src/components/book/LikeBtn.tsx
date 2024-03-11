import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface likeBtnProps {
  book: BookDetail;
  onClick: () => void;
}

const LikeBtn: React.FC<likeBtnProps> = ({ book, onClick }) => {
  console.log(book.liked);
  return (
    <LikeBtnStyle
      size="medium"
      scheme={book.liked ? "like" : "normal"}
      onClick={onClick}
    >
      <FaHeart /> {book.likes}
    </LikeBtnStyle>
  );
};

const LikeBtnStyle = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;

export default LikeBtn;
