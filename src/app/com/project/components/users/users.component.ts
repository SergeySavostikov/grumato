import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Employees} from '../component-models/users-model/user.model';
import {NbDialogService, NbToastrService, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {HttpService} from '../../services/http.service';
import {CreateUserComponent} from '../add-data-modal-window/create-user/create-user.component';
import {GetUsers, SaveUsers} from '../components-store/components.action';
import {select, Store} from '@ngrx/store';
import {AppGrumatoState} from '../../store/app-grumato.state';
import {DataState} from '../components-state/data.state';
import {selectUsers} from '../components-state/data.selector';



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

  customColumn = 'Name';
  defaultColumns = ['Command', 'Group', 'Project'];
  allColumns = [this.customColumn, ...this.defaultColumns];


  // users$ = this.store.pipe(select(selectUsers));
  users: Employees[] = [{
    surname: 'test',
    name: 'test',
    patronymic: 'test',
    phoneNumber: '1234',
    direction: 'test',
    // role: 'test'
  }];
  surname: string = '';
  name: string = '';
  patronymic: string = '';
  phoneNumber: string = '';
  direction: string = '';
  role: string = '';


  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Employees>,
              private dialogService: NbDialogService,
              private cdr: ChangeDetectorRef,
              private store: Store<AppGrumatoState>,
              private toast: NbToastrService,
              private postService: HttpService) {
    // this.users$.subscribe(user => {
    //   this.users = user;
    //   if (this.users.length >0) {
    //     for(let user of this.users){
    //       this.userName = user.name;
    //       this.userGroup = user.Group;
    //       this.userComand = user.Command;
    //       this.userProject = user.Project;
    //     }
    //   }
    //
    // })
  }

  ngOnInit(): void {
    this.postService.getUsers().subscribe(value => {
      let parse = JSON.parse((value as BaseResponse).status);
      parse.map(testParse => {
        let parse1 = JSON.parse(testParse) as Employees;
        this.users.push({
          surname: parse1.surname,
          phoneNumber: parse1.phoneNumber,
          patronymic: parse1.patronymic,
          direction: parse1.direction,
          name: parse1.name
        })
      })
    });
    // this.store.dispatch(new GetUsers());
    // setTimeout(() => {
      // let users$ = this.store.pipe(select(selectUsers));
      // users$.subscribe(user => {
      //   this.users = user;
      // })
    // }, 1000)

  }

  // onSave(){
  //   console.log(this.users);
  //   //
  // }


  onAddWorker() {
    let newUser: Employees;
    this.dialogService.open(CreateUserComponent).onClose.subscribe(value => {
      if (value) {
        newUser = {
          surname: value.surname,
          name: value.name,
          patronymic: value.patronymic,
          phoneNumber: value.phoneNumber,
          direction: value.direction,
          // role: value.role
        };
        for (let user of this.users) {
          if (user.name == newUser.name) {
            // ToDo change to filter in backend part
            this.toast.danger('Такой пользователь существует', 'Внимание');
            return;
          }
        }
        this.users.push(
          {
            surname: value.surname,
            name: value.name,
            patronymic: value.patronymic,
            phoneNumber: value.phoneNumber,
            direction: value.direction,
            // role: value.role
          }
        );
        this.cdr.detectChanges();
        this.postService.postUsers(newUser).subscribe(value => console.log(value)  );
        this.store.dispatch(new SaveUsers(newUser));
      }
    });
  }

  onDelete(data: Employees) {
    for (let item = 0; item < this.users.length; item++) {
      if (this.users[item].name == data.name) {
        this.users.splice(item, 1);
        this.cdr.detectChanges();
      }
    }
    this.postService.deleteUser(data).subscribe(value => console.log(value));
  }
}
