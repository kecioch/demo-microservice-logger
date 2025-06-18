import React, { useState } from "react";
import OrderList from "../OrderList/OrderList";
import { Button, useDisclosure } from "@heroui/react";
import { Order, OrderState } from "../../types/order";
import OrderModal from "../OrderModal/OrderModal";

const ORDERS: Order[] = [
  {
    id: "1",
    title: "Bestellung A320",
    description: "Bau eines A320",
    state: OrderState.IN_PROGRESS,
    created: new Date(),
  },
  {
    id: "2",
    title: "Bestellung Erdbeer-Smoothie",
    description: "Bitte einen Erdbeer Smoothie",
    state: OrderState.CANCELED,
    created: new Date(),
  },
];

interface Props {
  className?: string;
}

const OrderManagement = ({ className }: Props) => {
  const [orders, setOrders] = useState(ORDERS);
  const [editOrder, setEditOrder] = useState<null | Order>(null);
  const {
    isOpen: showOrderModal,
    onOpen: openOrderModal,
    onOpenChange: changeOrderModal,
    onClose
  } = useDisclosure();

  const handleOpenNewOrder = () => {
    setEditOrder(null);
    openOrderModal();
  };

  const handleOpenEditOrder = (id: string) => {
    console.log("EDIT " + id);
    const order = orders.find((el) => el.id === id);
    order && setEditOrder(order);
    openOrderModal();
  };

  const handleDeleteOrder = (id: string) => {
    console.log("DELETE " + id);
    onDelete(id);
  };

  const handleOrderSubmit = (order: Order) => {
    if (editOrder) onEditOrder(order);
    else onAddOrder(order);
  };

  const onDelete = (id: string) => {
    setOrders((prev) => {
      return prev.filter((el) => el.id !== id);
    });
  };

  const onAddOrder = (order: Order) => {
    console.log("CREATE ORDER", order);
    setOrders(prev => {
      return [...prev, order];
    });
    onClose();
  };

  const onEditOrder = (order: Order) => {
    console.log("EDIT ORDER", order);
    setOrders(prev => {
        // const newOrderList = [...prev];
        const index = prev.findIndex(el => el.id === order.id)
        prev[index] = order;
        return [...prev]
    })
    onClose();
  };

  return (
    <>
      <div className={`${className} text-center`}>
        <div className="flex justify-between items-start">
          <h1 className="text-left text-4xl uppercase mb-5">
            Auftragsverwaltung
          </h1>
          <Button
            color="secondary"
            className="text-xl"
            size="lg"
            onPress={handleOpenNewOrder}
          >
            Auftrag hinzufügen
          </Button>
        </div>
        <hr className="my-10" />
        <OrderList
          data={orders}
          onEdit={handleOpenEditOrder}
          onDelete={handleDeleteOrder}
        />
      </div>

      <OrderModal
        show={showOrderModal}
        editOrder={editOrder}
        onChange={changeOrderModal}
        onSubmit={handleOrderSubmit}
      />
    </>
  );
};

export default OrderManagement;
