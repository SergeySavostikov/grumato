import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {Employees} from '../component-models/users-model/user.model';
import {OrderEntry} from '../component-models/orders-model/order.model';
import {CreateOrderComponent} from '../add-data-modal-window/create-order/create-order.component';
import {UserCardsWindowComponent} from '../modals/user-cards-window/user-cards-window.component';
import {select, Store} from '@ngrx/store';
import {AppGrumatoState} from '../../store/app-grumato.state';
import {selectData} from '../components-state/data.selector';
import {DeleteOrder, SaveOrders} from '../components-store/components.action';
import {CustomerEntry} from '../component-models/customers-model/customer.model';
import {GenerateReportViewComponent} from '../modals/generate-report-view/generate-report-view.component';
import {GenerateTypes} from '../component-models/report-models/report.models';

export class OrdersBaseResponse {
  status: string;
  code: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  orders: OrderEntry[] = [];
  orders$ = this.store.pipe(select(selectData));
  customers: CustomerEntry[];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Employees>,
              private dialogService: NbDialogService,
              private cdr: ChangeDetectorRef,
              private toast: NbToastrService,
              private store: Store<AppGrumatoState>,) {
  }

  ngOnInit(): void {
    this.orders$.subscribe(value => {
      if (value) {
        this.orders = value.data.orders;
        this.customers = value.data.customers;
      }
    });
  }


  onAddOrder() {
    this.dialogService.open(CreateOrderComponent, {
      context: {
        customers: this.customers
      }
    }).onClose.subscribe(value => {
      if (value) {
        this.store.dispatch(new SaveOrders(value));
      }
    });
  }

  onDelete(dataOrder: OrderEntry) {
    this.store.dispatch(new DeleteOrder(dataOrder));
  }

  showWorkerInformation(order: OrderEntry) {
    this.dialogService.open(UserCardsWindowComponent, {
      context: {
        order: order
      }
    }).onClose.subscribe(value => {
      if (value) {
        console.info(value);
      }
    });
  }

  orderReport() {
    this.dialogService.open(GenerateReportViewComponent, {
      context: {
        dataState$: this.orders$,
        isComponent: GenerateTypes.GENERATE_ORDERS
      }
    }).onClose.subscribe();
  }
}
