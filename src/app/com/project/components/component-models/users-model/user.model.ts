import {OrderEntry} from '../orders-model/order.model';

export interface Employees {
  employeeCode?: number;
  surname: string;
  name: string;
  patronymic: string;
  phoneNumber: string;
  direction: string;
  project: OrderEntry[];
  // role: string;
}
