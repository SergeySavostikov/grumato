export interface GeneralReportModel {
  employeeCode?: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  phoneNumber?: string;
  direction?: string;
  project?: string;
  orderCode?: number;
  orderName?: string;
  orderDescription?: string;
  orderCustomerCode?: string;
  dateOfReceiptOfOrder?: Date;
  orderExecutionDate?: Date;
  orderCost?: string;
  customerCode?: number;
  customerSurname?: string;
  customerName?: string;
  customerPatronymic?: string;
  customercol?: string;
  company?: string;
  companyNumber?: string;
}

export enum GenerateTypes {
  GENERATE_USERS,
  GENERATE_ORDERS,
  GENERATE_CUSTOMERS,
  GENERATE_ALL
}
