import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React, { useState } from "react";
import { Order, OrderState } from "../../types/order";

const stateOptions = [
  {
    key: OrderState.IN_PROGRESS,
    label: "In Bearbeitung",
  },
  {
    key: OrderState.COMPLETED,
    label: "Abgeschlossen",
  },
  {
    key: OrderState.CANCELED,
    label: "Abgebrochen",
  },
];

interface OrderFormData {
  title: string;
  description: string;
  state: string;
}

interface Props {
  editOrder: Order | null;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: (order: Order) => void;
}

const OrderForm = ({ onCancel, editOrder, onSubmit, isLoading }: Props) => {
  const [errors] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as OrderFormData;

    const orderData: Order = {
      id: editOrder?.id,
      created: editOrder?.created,
      state: data.state as OrderState,
      title: data.title,
      description: data.description,
    };

    onSubmit(orderData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {editOrder && (
        <>
          <Input
            className="mb-4"
            label="Erstellt am"
            labelPlacement="outside"
            name="created"
            placeholder=" "
            defaultValue={editOrder.created?.toLocaleString()}
            disabled
          />

          <Input
            className="mb-8"
            label="ID"
            labelPlacement="outside"
            name="id"
            placeholder=" "
            defaultValue={editOrder.id}
            disabled
          />
        </>
      )}

      <Select
        className="mb-4"
        label="Status"
        name="state"
        labelPlacement="outside"
        placeholder="Status wählen"
        defaultSelectedKeys={
          editOrder
            ? [editOrder.state.toString()]
            : [OrderState.IN_PROGRESS.toString()]
        }
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return "Bitte Status wählen";
          }

          return errors;
        }}
      >
        {stateOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>

      <Input
        className="mb-4"
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return "Bitte Titel eingeben";
          }

          return errors;
        }}
        label="Titel"
        labelPlacement="outside"
        name="title"
        placeholder="Titel eingeben"
        defaultValue={editOrder ? editOrder.title : ""}
      />

      <Textarea
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return "Bitte Beschreibung eingeben";
          }

          return errors;
        }}
        label="Beschreibung"
        labelPlacement="outside"
        name="description"
        placeholder="Beschreibung eingeben"
        minRows={10}
        defaultValue={editOrder ? editOrder.description : ""}
      />

      <div className="flex gap-4 justify-end w-full mt-8 mb-4">
        <Button color="danger" variant="light" onPress={onCancel}>
          Abbrechen
        </Button>
        <Button color="primary" type="submit" isLoading={isLoading}>
          {editOrder ? "Aktualisieren" : "Hinzufügen"}
        </Button>
      </div>
    </Form>
  );
};

export default OrderForm;
