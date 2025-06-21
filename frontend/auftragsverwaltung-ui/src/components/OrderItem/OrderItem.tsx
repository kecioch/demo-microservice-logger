import React from "react";
import { Order, OrderState } from "../../types/order";
import { Button } from "@heroui/react";
import { convertStateToText } from "../../services/orderState";
import { EditIcon, TrashIcon } from "../icons/icons";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  data: Order;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const getColor = (state: OrderState) => {
  switch (state) {
    case OrderState.IN_PROGRESS:
      return "text-yellow-500 border-yellow-500";
    case OrderState.CANCELED:
      return "text-red-600 border-red-600";
    case OrderState.COMPLETED:
      return "text-green-700 border-green-700";
  }
};

const OrderItem = ({ data, onEdit, onDelete }: Props) => {
  return (
    <motion.div
      className="w-full bg-gray-200 rounded-lg p-5 text-left flex justify-between flex-wrap gap-5 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex gap-4 mb-2">
          <span className="font-bold text-xl">#{data.id}</span>
          <span className={`border-2 rounded-lg px-2 ${getColor(data.state)}`}>
            {convertStateToText(data.state)}
          </span>
        </div>
        <p className="mb-1">
          <span className="font-bold">Erstellt am:</span>{" "}
          {data.created?.toLocaleString()}
        </p>
        <p className="truncate">
          <span className="font-bold">Titel: </span> {data.title}
        </p>
      </div>
      <div className="flex justify-center items-center gap-3 flex-shrink-0 whitespace-nowrap">
        <Button
          color="warning"
          isIconOnly
          title="Bearbeiten"
          onPress={() => data.id && onEdit(data.id)}
        >
          <EditIcon fill="#160a0a" />
        </Button>
        <Button
          color="danger"
          isIconOnly
          title="Löschen"
          onPress={() => data.id && onDelete(data.id)}
        >
          <TrashIcon fill="#160a0a" />
        </Button>
      </div>
    </motion.div>
  );
};

export default OrderItem;
