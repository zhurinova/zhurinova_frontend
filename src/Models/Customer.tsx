import { Order } from "./Order";

export interface Customer {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    Orders: Order[]; 
  }