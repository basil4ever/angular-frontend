import {Employee} from "../employee";

export class Invoice {
  id?: number;
  employee: Employee;
  amount: string;
  currency: string;
  description: string;
  created: string;
  invoiceData: string;
}
