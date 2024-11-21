import { OrderDatailItem, Orders, OrderSheet } from '../models/order.model';
import { requestHandler } from './http';

// export const order = async (orderData: OrderSheet) => {
//     const response = await httpClient.post("/orders", orderData);
//     return response.data
// }

export const order = async (orderData: OrderSheet) => {
  return await requestHandler<OrderSheet>('post', '/orders', orderData);
};

// export const fetchOrders = async () => {
//     const response = await httpClient.get<Orders[]>("/orders");
//     return response.data;
// }

// export const fetchOrder = async (orderId: number) => {
//     const response = await httpClient.get<OrderDatailItem[]>(`/orders/${orderId}`);
//     return response.data;
// }

export const fetchOrders = async () => {
  return await requestHandler<Orders[]>('get', '/orders');
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler<OrderDatailItem[]>('get', `/orders/${orderId}`);
};
