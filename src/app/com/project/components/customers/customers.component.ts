import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {HttpService} from '../../services/http.service';
import {CustomerEntry} from '../component-models/customers-model/customer.model';
import {CreateCustomerComponent} from '../add-data-modal-window/create-customer/create-customer.component';
import {UserCardsWindowComponent} from '../modals/user-cards-window/user-cards-window.component';
import {AppGrumatoState} from '../../store/app-grumato.state';
import {select, Store} from '@ngrx/store';
import {selectData} from '../components-state/data.selector';
import {GetAllDataLoad} from '../components-store/components.action';
import {GenerateReportViewComponent} from '../modals/generate-report-view/generate-report-view.component';

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
              private store: Store<AppGrumatoState>,
              private toast: NbToastrService,
              private postService: HttpService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllDataLoad());
    this.customers$.subscribe(value => {
      if (value) {
        this.customers = value.data.customers;
      }
    });
  }

  onAddCustomer() {
    this.dialogService.open(CreateCustomerComponent).onClose.subscribe(value => {
      let newCustomer: CustomerEntry = {
        surname: value.surname,
        name: value.name,
        patronymic: value.patronymic,
        customercol: value.customercol,
        company: value.company,
        companyNumber: value.companyNumber
      };
      for (let order of this.customers) {
        if (order.name == newCustomer.name) {
          // ToDo change to filter in backend part
          this.toast.danger('Такой заказчик существует', 'Внимание');
          return;
        }
      }
      this.postService.postCustomer(newCustomer).subscribe(value => {
        console.log(value);
        this.store.dispatch(new GetAllDataLoad());
      });
    });
    this.cdr.detectChanges();
  }

  onDelete(dataUser: CustomerEntry) {
    for (let item = 0; item < this.customers.length; item++) {
      if (this.customers[item].name == dataUser.name) {
        this.customers.splice(item, 1);
        this.cdr.detectChanges();
      }
    }
    this.postService.deleteCustomer(dataUser).subscribe(value => console.log(value));
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
        dataState$: this.customers$
      }
    }).onClose.subscribe();
  }

}
