import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Employees} from '../../component-models/users-model/user.model';
import {OrderEntry} from '../../component-models/orders-model/order.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: Employees;
  surname:string;
  name: string;
  patronymic: string;
  phoneNumber: string;
  direction: string;
  project: OrderEntry[];
  role: string;
  orders: OrderEntry[];
  selectedOrder: OrderEntry = null;

  constructor(protected ref: NbDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
    if (this.user) {
      this.surname = this.user.surname;
      this.name = this.user.name;
      this.patronymic = this.user.patronymic;
      this.phoneNumber = this.user.phoneNumber;
      this.direction = this.user.direction;
      this.project = this.user.project;
      this.role = 'nothing';
    } else {
      this.surname = '';
      this.name = '';
      this.patronymic = '';
      this.phoneNumber = '';
      this.direction = '';
      this.project = [];
      this.role = '';
    }

  }
  cancel() {
    this.ref.close(false)
  }

  submit() {
    this.ref.close({
      surname: this.surname,
      name: this.name,
      patronymic: this.patronymic,
      phoneNumber: this.phoneNumber,
      direction: this.direction,
      project: this.project,
      role: this.role
    })
  }

  selectedOrderItem(order: OrderEntry){
    this.selectedOrder = order;
  }
}
