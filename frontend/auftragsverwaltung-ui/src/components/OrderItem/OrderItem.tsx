import React from "react";
import { Order, OrderState } from "../../types/order";
import { Button } from "@heroui/react";

interface Props {
  data: Order;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const convertStateToText = (state: OrderState) => {
  switch (state) {
    case OrderState.IN_PROGRESS:
      return "In Bearbeitung";
    case OrderState.COMPLETED:
      return "Abgeschlossen";
    case OrderState.CANCELED:
      return "Abgebrochen";
  }
};

const OrderItem = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full bg-gray-200 rounded-lg p-5 text-left flex justify-between flex-wrap gap-5 shadow-md">
      <div className="flex-1 min-w-0">
        <div className="flex gap-4 mb-2">
          <span className="border-violet-500 border-2 rounded-lg px-2 ">
            {convertStateToText(data.state)}
          </span>
          <span>#{data.id}</span>
        </div>
        <p className="mb-3">Erstellt am: {data.created?.toLocaleString()}</p>
        <p className="truncate">Titel: {data.title}</p>
      </div>
      <div className="flex justify-center items-center gap-3 flex-shrink-0 whitespace-nowrap">
        <Button color="warning" onPress={() => data.id && onEdit(data.id)}>Edit</Button>
        <Button color="danger" onPress={() => data.id && onDelete(data.id)}>Delete</Button>
      </div>
    </div>
  );
};

export default OrderItem;
