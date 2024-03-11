import { Cart } from "../models/cart.model";
import { httpClient } from "./http";

interface addCartPrams {
  bookId: number;
  count: number;
}

export const addCart = async (params: addCartPrams) => {
  const response = await httpClient.post("/carts", params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>("/carts");
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const response = await httpClient.delete(`/carts/${cartId}`);
  return response.data;
};
