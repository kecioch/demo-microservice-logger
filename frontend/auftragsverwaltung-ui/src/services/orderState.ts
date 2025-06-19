import { OrderState } from "../types/order";

export const convertStateToText = (state: OrderState) => {
  switch (state) {
    case OrderState.IN_PROGRESS:
      return "In Bearbeitung";
    case OrderState.COMPLETED:
      return "Abgeschlossen";
    case OrderState.CANCELED:
      return "Abgebrochen";
  }
};
