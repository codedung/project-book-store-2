export interface Order {
  id: number;
  createAt: string;
  address: string;
  receiver: string;
  contact: string;
  title: string;
  totalCount: number;
  totalPrice: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetail[];
}

export interface OrderSheet {
  items: number[];
  totalCount: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetail {
  bookId: number;
  author: string;
  title: string;
  count: number;
  price: number;
}
