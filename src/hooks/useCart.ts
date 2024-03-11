import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/cart.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      setCarts(carts.filter((cart) => cart.idx !== id));
    });
  };

  useEffect(() => {
    fetchCart().then(
      (response) => {
        setCarts(response);
        setIsEmpty(false);
      },
      (error) => {
        if (error.response.status === 404) {
          // console.log("데이터 없음");
        }
      }
    );
  }, []);

  return { carts, isEmpty, deleteCartItem };
};
