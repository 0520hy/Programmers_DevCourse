import { useEffect, useState } from 'react';
import { fetchOrder, fetchOrders } from '../api/order.api';
import { OrderListItem } from '../models/order.model';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selecteOrderItem = (orderId: number) => {
    // 요청 방어 (자세히 버튼을 다시 눌렀을 때)
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      setSelectedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        }),
      );
    });
  };

  return { orders, selectedItemId, selecteOrderItem };
};
