import { Component, OnInit } from '@angular/core';
import {NbDialogRef, NbSelectComponent} from '@nebular/theme';
import {Employees} from '../../component-models/users-model/user.model';
import {OrderEntry} from '../../component-models/orders-model/order.model';
import {UserHelperService} from "../../../services/user.helper.service";

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
  project: string;
  role: string;
  orders: OrderEntry[];
  selectedOrder: string[] = [];

  constructor(protected ref: NbDialogRef<CreateUserComponent>, private userHelperService: UserHelperService) { }

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
      this.project = '';
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
      project: this.selectedOrder.length > 0 ? this.userHelperService.convertUserProject(this.selectedOrder) : '',
      role: this.role
    })
  }

  onChangeSelectedOrder(selectedOrders: NbSelectComponent) {
    this.selectedOrder = selectedOrders.selected;
  }
}
