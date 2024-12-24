 export interface Order {
    id: number;
    price: number;
    status?: string;
    dateTime: string;
    customerId?: number;
  }