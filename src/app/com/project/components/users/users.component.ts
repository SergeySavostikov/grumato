import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Employees} from '../component-models/users-model/user.model';
import {NbDialogService, NbToastrService, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {HttpService} from '../../services/http.service';

import {select, Store} from '@ngrx/store';
import {AppGrumatoState} from '../../store/app-grumato.state';
import {UserCardsWindowComponent} from '../modals/user-cards-window/user-cards-window.component';
import {CreateUserComponent} from '../add-data-modal-window/create-user/create-user.component';
import {DeleteUser, SaveUsers} from '../components-store/components.action';
import {selectData} from "../components-state/data.selector";
import {OrderEntry} from '../component-models/orders-model/order.model';
import {UserHelperService} from "../../services/user.helper.service";


export class BaseResponse {
  status: string;
  code: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$ = this.store.pipe(select(selectData));
  users: Employees[] = [];
  project: OrderEntry[];
  orders: OrderEntry[];


  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Employees>,
              private dialogService: NbDialogService,
              private cdr: ChangeDetectorRef,
              private store: Store<AppGrumatoState>,
              private toast: NbToastrService,
              private postService: HttpService,
              private userHelperService: UserHelperService) {
  }

  ngOnInit(): void {
    this.users$.subscribe(data => {
      if (data) {
        this.orders = data.data.orders;
      }
    })
  }

  onAddWorker() {
    this.dialogService.open(CreateUserComponent, {
      context: {
        orders: this.orders
      }
    }).onClose.subscribe(value => {
      if (value) {

        this.store.dispatch(new SaveUsers(value));
      }
    });
  }

  showWorkerInformation(currentUser: Employees) {
    this.dialogService.open(UserCardsWindowComponent, {
      context: {
        user: currentUser,
        orders: this.orders
      }
    }).onClose.subscribe(value => {
      if (value) {
        this.store.dispatch(new SaveUsers(value))
      }
    });
  }

  onDelete(data: Employees) {
    this.store.dispatch(new DeleteUser(data));
  }

  onUserProjects(project: string): string {
  return this.userHelperService.convertOrderIdsToOrderNameForUsers(project, this.orders);
  }
}

