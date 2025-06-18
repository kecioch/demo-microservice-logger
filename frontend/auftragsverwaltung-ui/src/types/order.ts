export enum OrderState {
  IN_PROGRESS,
  CANCELED,
  COMPLETED,
}

export interface Order {
  id?: string;
  created?: Date;
  title: string;
  description: string;
  state: OrderState;
}
