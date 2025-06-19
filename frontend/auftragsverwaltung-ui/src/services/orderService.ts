import { Order } from "../types/order";
import { http } from "./http";

const API_URL = process.env.REACT_APP_API_URL + "/api/orders";

export const orderService = {
  async create(order: Order): Promise<Order> {
    const newOrder = await http.post<Order>(API_URL, order);
    return {
      ...newOrder,
      created: newOrder.created && new Date(newOrder.created),
    };
  },

  async getAll(): Promise<Order[]> {
    const orders: Order[] = await http.get<Order[]>(API_URL);
    return orders.map((order) => ({
      ...order,
      created: order.created && new Date(order.created),
    }));
  },

  async update(order: Order): Promise<Order> {
    const updated = await http.put<Order>(`${API_URL}/${order.id}`, order);
    return {
      ...updated,
      created: updated.created && new Date(updated.created),
    };
  },

  async delete(id: string): Promise<void> {
    await http.delete(`${API_URL}/${id}`);
  },
};
