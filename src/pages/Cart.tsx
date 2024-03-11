import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import { deleteCart } from "../api/cart.api";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { carts, isEmpty, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleDeleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.idx)) {
        return acc + cart.count;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.idx)) {
        return acc + cart.price * cart.count;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handelOrder = () => {
    if (checkedItems.length === 0) {
      showAlert("주문할 상품을 선택해 주세요.");
      return;
    }
    // 주문서 작성에 필요한 데이터 전달
    const orderData: Omit<OrderSheet, "delivery"> = {
      items: checkedItems,
      totalCount: totalQuantity,
      totalPrice: totalPrice,
      firstBookTitle:
        carts[
          carts.findIndex((cart) => {
            return cart.idx === checkedItems[0];
          })
        ].title
    };
    showConfirm("주문하시겠습니까?", () => {
      navigate("/order", { state: orderData });
    });
  };
  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((cart) => (
                <CartItem
                  key={cart.idx}
                  cart={cart}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
              />
              <Button size="large" scheme="primary" onClick={handelOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}

        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다."
            icon={<FaShoppingCart />}
            description="장바구니를 채워보세요."
          />
        )}
      </CartStyle>
    </>
  );
};

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding-top: 24px;

  .content {
    flex: 1;
    display: flex;
    flex-flow: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-flow: column;
    gap: 24px;
  }

  .order-info {
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;

    h1 {
      padding-bottom: 24px;
    }
    .delivery {
      display: flex;
      flex-flow: column;

      fieldset {
        display: flex;
        border: 0;
        margin: 0;
        padding-bottom: 12px;
        justify-content: start;
        gap: 8px;

        label {
          width: 80px;
        }
        .input {
          flex: 1;

          input {
            width: 100%;
          }
        }
      }
      .error-text {
        color: red;
        margin: 0;
        padding-bottom: 12px;
        text-align: right;
      }
    }
  }
`;

export default Cart;
