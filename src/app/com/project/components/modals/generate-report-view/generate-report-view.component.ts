import {Component, OnInit} from '@angular/core';
import * as WebDataRocks from 'webdatarocks';
import {NbDialogRef} from '@nebular/theme';
import {Employees} from '../../component-models/users-model/user.model';
import {Observable} from 'rxjs';
import {DataState} from '../../components-state/data.state';
import {CustomerEntry} from '../../component-models/customers-model/customer.model';
import {OrderEntry} from '../../component-models/orders-model/order.model';
import {GeneralReportModel, GenerateTypes} from '../../component-models/report-models/report.models';
import {UserHelperService} from '../../../services/user.helper.service';

@Component({
  selector: 'app-generat-report-view',
  templateUrl: './generate-report-view.component.html',
  styleUrls: ['./generate-report-view.component.css']
})
export class GenerateReportViewComponent implements OnInit {

  dataState$: Observable<DataState>;
  users: Employees[] = [];
  orders: OrderEntry[] = [];
  customers: CustomerEntry[] = [];
  datas: any[] = [];
  isComponent: GenerateTypes;
  usersReport: GenerateTypes = GenerateTypes.GENERATE_USERS;
  ordersReport: GenerateTypes = GenerateTypes.GENERATE_ORDERS;
  customersReport: GenerateTypes = GenerateTypes.GENERATE_CUSTOMERS;
  // ToDO refactor for generate report to all data
  generalReport: GenerateTypes = GenerateTypes.GENERATE_ALL;

  constructor(protected ref: NbDialogRef<GenerateReportViewComponent>) {
  }

  ngOnInit(): void {
    this.dataState$.subscribe(data => {
      this.fillDataForReport(this.users, data.data.users);
      this.fillDataForReport(this.orders, data.data.orders);
      this.fillDataForReport(this.customers, data.data.customers);
    });
    if (this.users.length > 0 && this.orders.length > 0 && this.customers.length > 0) {
      const arrLength: number = UserHelperService.biggerArrLength(this.users, this.orders, this.customers);
      for (let i = 0; i < arrLength; i++) {
        let res: GeneralReportModel = {};
        this.fillReportObj(res, i);
        this.datas.push(res);
      }
    }
  }

  cancel() {
    this.ref.close(false);
  }

  generateGeneralReport() {
    const pivot = new WebDataRocks({
      container: '#wdr-component',
      toolbar: true,
      report: {
        dataSource: {
          data: this.datas,
        }
      },
    });
  }

  private fillDataForReport(fillingArr: any[], arr: any[]): void {
    if (arr.length > 0) {
      arr.forEach(value => {
        fillingArr.push(value);
      });
    }
  }

  private fillReportObj(res: GeneralReportModel, counter: number): void {
    if (counter < this.users.length) {
      this.fillUserPart(res, counter);
    }
    if (counter < this.orders.length) {
      this.fillOtrderPart(res, counter);
    }
    if (counter < this.customers.length) {
      this.fillCustomerPart(res, counter);
    }
  }

  private fillUserPart(res: GeneralReportModel, counter: number): void {
    res.employeeCode = this.users[counter].employeeCode;
    res.surname = this.users[counter].surname;
    res.name = this.users[counter].name;
    res.patronymic = this.users[counter].patronymic;
    res.phoneNumber = this.users[counter].phoneNumber;
    res.direction = this.users[counter].direction;
    res.project = this.users[counter].project;
  }

  private fillOtrderPart(res: GeneralReportModel, counter: number): void {
    res.orderCode = this.orders[counter].orderCode;
    res.orderName = this.orders[counter].orderName;
    res.orderDescription = this.orders[counter].orderDescription;
    res.orderCustomerCode = this.orders[counter].customerCode;
    res.dateOfReceiptOfOrder = this.orders[counter].dateOfReceiptOfOrder;
    res.orderExecutionDate = this.orders[counter].orderExecutionDate;
    res.orderCost = this.orders[counter].orderCost;
  }

  private fillCustomerPart(res: GeneralReportModel, counter: number): void {
    res.customerCode = this.customers[counter].customerCode;
    res.customerSurname = this.customers[counter].surname;
    res.customerName = this.customers[counter].name;
    res.customerPatronymic = this.customers[counter].patronymic;
    res.customercol = this.customers[counter].customercol;
    res.company = this.customers[counter].company;
    res.companyNumber = this.customers[counter].companyNumber;
  }
}
