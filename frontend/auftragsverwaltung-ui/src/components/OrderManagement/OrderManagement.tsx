import React, { useEffect, useState } from "react";
import OrderList from "../OrderList/OrderList";
import { addToast, Button, useDisclosure } from "@heroui/react";
import { Order } from "../../types/order";
import OrderModal from "../OrderModal/OrderModal";
import { orderService } from "../../services/orderService";

interface Props {
  className?: string;
}

const OrderManagement = ({ className }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [editOrder, setEditOrder] = useState<null | Order>(null);
  const {
    isOpen: showOrderModal,
    onOpen: openOrderModal,
    onOpenChange: changeOrderModal,
    onClose,
  } = useDisclosure();

  const handleOpenNewOrder = () => {
    setEditOrder(null);
    openOrderModal();
  };

  const handleOpenEditOrder = (id: string) => {
    const order = orders.find((el) => el.id === id);
    order && setEditOrder(order);
    openOrderModal();
  };

  const handleDeleteOrder = (id: string) => {
    onDelete(id);
  };

  const handleOrderSubmit = (order: Order) => {
    if (editOrder) onEditOrder(order);
    else onAddOrder(order);
  };

  const onDelete = async (id: string) => {
    try {
      await orderService.delete(id);
      setOrders((prev) => {
        return prev.filter((el) => el.id !== id);
      });
      addToast({
        title: "Auftrag löschen",
        description: "Auftrag wurde erfolgreich gelöscht",
        variant: "solid",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "Auftrag löschen",
        description: "Auftrag konnte nicht gelöscht werden",
        variant: "solid",
        color: "danger",
      });
    }
  };

  const onAddOrder = async (order: Order) => {
    try {
      setIsLoadingModal(true);
      const newOrder = await orderService.create(order);
      setOrders((prev) => [...prev, newOrder]);
      onClose();
      addToast({
        title: "Neuer Auftrag",
        description: "Auftrag wurde erfolgreich hinzugefügt",
        variant: "solid",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "Neuer Auftrag",
        description: "Auftrag konnte nicht hinzugefügt werden",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsLoadingModal(false);
    }
  };

  const onEditOrder = async (order: Order) => {
    try {
      setIsLoadingModal(true);
      const updatetOrder = await orderService.update(order);
      setOrders((prev) => {
        const index = prev.findIndex((el) => el.id === updatetOrder.id);
        prev[index] = updatetOrder;
        return [...prev];
      });
      onClose();
      addToast({
        title: "Auftrag bearbeiten",
        description: "Auftrag wurde erfolgreich bearbeitet",
        variant: "solid",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "Auftrag bearbeiten",
        description: "Auftrag konnte nicht bearbeitet werden",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsLoadingModal(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const orders = await orderService.getAll();
      setOrders(orders);
    } catch (error) {
      console.error(error);
      addToast({
        title: "Laden von Aufträgen",
        description: "Auftrag konnten nicht geladen werden",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
          isLoading={isLoading}
          onEdit={handleOpenEditOrder}
          onDelete={handleDeleteOrder}
        />
      </div>

      <OrderModal
        show={showOrderModal}
        editOrder={editOrder}
        isLoading={isLoadingModal}
        onChange={changeOrderModal}
        onSubmit={handleOrderSubmit}
      />
    </>
  );
};

export default OrderManagement;
