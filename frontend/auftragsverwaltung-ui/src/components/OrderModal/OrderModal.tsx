import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import React from "react";
import OrderForm from "./OrderForm";
import { Order } from "../../types/order";

interface Props {
  show: boolean;
  editOrder: Order | null;
  isLoading: boolean;
  onChange: () => void;
  onSubmit: (order: Order) => void;
}

const OrderModal = ({
  show,
  editOrder,
  isLoading,
  onChange,
  onSubmit,
}: Props) => {
  return (
    <Modal size="xl" isOpen={show} onOpenChange={onChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 uppercase text-xl pt-10">
              {!editOrder ? "Neuer Auftrag" : "Auftrag bearbeiten"}
            </ModalHeader>
            <ModalBody>
              <OrderForm
                onCancel={onClose}
                editOrder={editOrder}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
