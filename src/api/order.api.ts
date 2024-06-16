import { OrderDatailItem, OrderSheet, Orders } from "../models/order.model";
import { httpClient } from "./http"

export const order = async (orderData: OrderSheet) => {
    const response = await httpClient.post("/orders", orderData);
    return response.data
}

export const fetchOrders = async () => {
    const response = await httpClient.get<Orders[]>("/orders");
    return response.data;
}

export const fetchOrder = async (orderId: number) => {
    const response = await httpClient.get<OrderDatailItem[]>(`/orders/${orderId}`);
    return response.data;
}