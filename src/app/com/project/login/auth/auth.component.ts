import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {LoginPageActions, LoginUser, SignUpUser} from '../../store/login-store/login-page.actions';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {LoginSignUpWindowComponent} from './login-sign-up-window/login-sign-up-window.component';
import {Store} from '@ngrx/store';
import {AppGrumatoState} from '../../store/app-grumato.state';
import {GetAllDataLoad} from "../../components/components-store/components.action";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private store: Store<AppGrumatoState>, private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
  }


  /**
   * Login user
   */
  userName: string;

  /**
   * Password user
   */
  password: string;

  loading: boolean;

  ngOnInit(): void {
  }


  open() {
    this.dialogService.open(LoginSignUpWindowComponent, {
      context: {},
    }).onClose.subscribe(value => {
      if (value) {
        this.store.dispatch(new SignUpUser({
          userName: value.name,
          password: value.password,
          userType: value.userType
        }));
        return status = "success";
      }
    }).add();
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => this.loading = false);
    if (this.userName && this.password) {
      this.store.dispatch(new LoginUser({
        userName: this.userName,
        password: this.password
      }));
    }
  }

  onClear(){
    if (this.userName || this.password){
      this.userName = "";
      this.password = "";
      this.toastrService.success("Clear", "success", {duration: 2000})
    }
    return status = "success";
  }

  isUserName(): boolean {
    return !this.userName;
  }

  isPassword(): boolean {
    return !this.password;
  }

}
