export interface Peripheral {
  _id?: string;
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: boolean;
  gatewayId?: string;
}
