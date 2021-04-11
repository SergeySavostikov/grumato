import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {IAngularMyDpOptions, IMyDateModel} from "angular-mydatepicker";
import {AppGrumatoState} from "../../../store/app-grumato.state";
import {Store} from "@ngrx/store";
import {CustomerEntry} from "../../component-models/customers-model/customer.model";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  orderDescription: string;
  dateOfReceiptOfOrder: Date;
  orderExecutionDate: Date;
  orderName: string;
  orderCost: string;
  customers: CustomerEntry[];


  startDate: IMyDateModel = null;
  endDate: IMyDateModel = null;

  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
  };
  selectedCustomer: CustomerEntry = null;


  constructor(protected ref: NbDialogRef<CreateOrderComponent>) {
  }

  ngOnInit() {
  }

  cancel() {
    this.ref.close(false)
  }

  submit() {
    this.ref.close({
      orderDescription: this.orderDescription,
      customerCode: this.selectedCustomer.customerCode,
      dateOfReceiptOfOrder: this.dateOfReceiptOfOrder,
      orderExecutionDate: this.orderExecutionDate,
      orderName: this.orderName,
      orderCost: this.orderCost,
    })
  }

  onDateChanged(event: IMyDateModel, isStartDate: boolean): void {
    if (isStartDate) {
      this.dateOfReceiptOfOrder = event.singleDate.jsDate;
    } else {
      this.orderExecutionDate = event.singleDate.jsDate;
    }
  }

  changeSelectedItem(customer: CustomerEntry) {
    this.selectedCustomer = customer;
  }
}
