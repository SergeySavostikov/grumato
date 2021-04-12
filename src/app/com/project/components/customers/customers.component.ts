import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbDialogService, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {CustomerEntry} from '../component-models/customers-model/customer.model';
import {CreateCustomerComponent} from '../add-data-modal-window/create-customer/create-customer.component';
import {UserCardsWindowComponent} from '../modals/user-cards-window/user-cards-window.component';
import {AppGrumatoState} from '../../store/app-grumato.state';
import {select, Store} from '@ngrx/store';
import {selectData} from '../components-state/data.selector';
import {DeleteCustomer, SaveCustomers} from '../components-store/components.action';
import {GenerateReportViewComponent} from '../modals/generate-report-view/generate-report-view.component';
import {GenerateTypes} from '../component-models/report-models/report.models';

export class CustomersBaseResponse {
  status: string;
  code: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customColumn = 'Name';
  defaultColumns = ['Order', 'CompanyName', 'Pay'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  customers: CustomerEntry[] = [];
  customers$ = this.store.pipe(select(selectData));
  data = [];
  surname: string = '';
  name: string = '';
  patronymic: string = '';
  customercol: string = '';
  company: string = '';
  companyNumber: string = '';

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<CustomerEntry>,
              private dialogService: NbDialogService,
              private cdr: ChangeDetectorRef,
              private store: Store<AppGrumatoState>,) {
  }

  ngOnInit(): void {
    this.customers$.subscribe(value => {
      if (value) {
        this.customers = value.data.customers;
      }
    });
  }

  onAddCustomer() {
    this.dialogService.open(CreateCustomerComponent).onClose.subscribe(value => {
      if (value) {
        this.store.dispatch(new SaveCustomers(value));
      }
    });
    this.cdr.detectChanges();
  }

  onDelete(dataCustomer: CustomerEntry) {
    this.store.dispatch(new DeleteCustomer(dataCustomer));
  }

  showWorkerInformation(customer: CustomerEntry) {
    this.dialogService.open(UserCardsWindowComponent, {
      context: {
        customer: customer
      }
    }).onClose.subscribe(value => {
      if (value) {
        console.log(value);
      }
    });
  }

  customerReport() {
    this.dialogService.open(GenerateReportViewComponent, {
      context: {
        dataState$: this.customers$,
        isComponent: GenerateTypes.GENERATE_CUSTOMERS
      }
    }).onClose.subscribe();
  }

}
