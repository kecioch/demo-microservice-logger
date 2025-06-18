import React from "react";
import OrderItem from "../OrderItem/OrderItem";
import { Order } from "../../types/order";

interface Props {
  data: Order[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const OrderList = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      {data.map((order, index) => (
        <OrderItem key={index} data={order} onEdit={onEdit} onDelete={onDelete} />
      ))}

      {data.length <= 0 && (
        <p className="w-full text-center text-gray-800 text-lg">
          Keine Aufträge vorhanden
        </p>
      )}
    </div>
  );
};

export default OrderList;
