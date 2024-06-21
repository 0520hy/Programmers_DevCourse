export interface Orders {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: Delivery;
}
export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDatailItem {
  book_id: number;
  titles: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Orders {
  detail?: OrderDatailItem[];
}
