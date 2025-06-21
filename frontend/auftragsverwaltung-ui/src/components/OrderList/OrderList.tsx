import React from "react";
import OrderItem from "../OrderItem/OrderItem";
import { Order } from "../../types/order";
import { Spinner } from "@heroui/react";
import { AnimatePresence } from "framer-motion";

interface Props {
  data: Order[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const OrderList = ({ data, isLoading, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full flex justify-center items-start flex-col gap-5">
      <AnimatePresence>
        {!isLoading &&
          data.map((order, index) => (
            <OrderItem
              key={index}
              data={order}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
      </AnimatePresence>

      {data.length <= 0 && !isLoading && (
        <p className="w-full text-center text-gray-800 text-lg">
          Keine Aufträge vorhanden
        </p>
      )}

      {isLoading && (
        <div className="w-full flex justify-center items-center pt-16">
          <Spinner size="lg" color="secondary" />
        </div>
      )}
    </div>
  );
};

export default OrderList;
