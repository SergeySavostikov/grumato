import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  surname: string;
  name: string;
  patronymic: string;
  customercol: string;
  company: string;
  companyNumber: string;
  orders: string[] = [];

  constructor(protected ref: NbDialogRef<CreateCustomerComponent>) { }

  orderSelected: boolean;

  //ToDo refactor to customer model
  ngOnInit() {
    this.surname= '';
    this.name= '';
    this.patronymic= '';
    this.customercol= '';
    this.company= '';
    this.companyNumber= '';
  }

  cancel() {
    this.ref.close(false)
  }

  submit() {
    this.ref.close({
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
      customercol: this.customercol,
      company: this.company,
      companyNumber: this.companyNumber,
    })
  }

  addOrder(order: HTMLInputElement) {
    this.orders.push(order.value);
    this.orderSelected = !this.orderSelected;
    order.value = '';
  }
}
