import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {Employees} from '../component-models/users-model/user.model';
import {OrderEntry} from '../component-models/orders-model/order.model';
import {HttpService} from '../../services/http.service';
import {CreateOrderComponent} from '../add-data-modal-window/create-order/create-order.component';
import {BaseResponse} from "../users/users.component";
import {UserCardsWindowComponent} from '../modals/user-cards-window/user-cards-window.component';
import {select, Store} from "@ngrx/store";
import {AppGrumatoState} from "../../store/app-grumato.state";
import {selectData, selectOrders} from "../components-state/data.selector";
import {GetAllDataLoad, SaveOrders} from "../components-store/components.action";
import {CustomerEntry} from "../component-models/customers-model/customer.model";

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
              private store: Store<AppGrumatoState>,
              private postService: HttpService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllDataLoad());
    this.orders$.subscribe(value => {
      console.log(value);
      if (value) {
        this.orders = value.data.orders;
        this.customers = value.data.customers;
        this.cdr.detectChanges();
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
        this.store.dispatch(new SaveOrders(value))
      }
    });
  }

  onDelete(dataUser: OrderEntry) {
    for (let item = 0; item < this.orders.length; item++) {
      if (this.orders[item].orderCode == dataUser.orderCode) {
        this.orders.splice(item, 1);
        this.cdr.detectChanges();
      }
    }
    this.postService.deleteOrder(dataUser).subscribe(value => console.log(value))
  }

  showWorkerInformation(order: OrderEntry) {
    this.dialogService.open(UserCardsWindowComponent, {
      context: {
        order: order
      }
    }).onClose.subscribe(value => {
      if (value) {
        console.log(value)
      }
    });
  }

}
