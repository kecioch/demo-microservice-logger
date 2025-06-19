export enum OrderState {
  IN_PROGRESS="IN_PROGRESS",
  CANCELED="CANCELED",
  COMPLETED="COMPLETED",
}

export interface Order {
  id?: string;
  created?: Date;
  title: string;
  description: string;
  state: OrderState;
}
