import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import { addCart } from "../../api/cart.api";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface IAddToCartProps {
  book: BookDetail;
  onClick?: () => void;
}

const AddToCart: React.FC<IAddToCartProps> = ({ book, onClick }) => {
  const { showAlert } = useAlert();
  const { addToCart, cartAdded } = useBook(book.idx.toString());
  const [quantity, setQueantity] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return;
    setQueantity(Number(e.target.value));
  };
  const handleIncrese = () => {
    setQueantity(quantity + 1);
  };
  const handleDecrese = () => {
    if (quantity == 1) return;
    setQueantity(quantity - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div className="count">
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrese}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrese}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => addToCart(quantity)}
      >
        Add to Cart
      </Button>
      {cartAdded && (
        <div className="added">
          <p>장바구니에 추가되었습니다.</p>
          <Link to="/carts">장바구니로 이동</Link>
        </div>
      )}
    </AddToCartStyle>
  );
};

interface AddCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? 1 : 0)};
    transition: all 0.5s ease;
    p {
      padding-bottom: 8px;
      margin: 0;
    }
  }
`;

export default AddToCart;
