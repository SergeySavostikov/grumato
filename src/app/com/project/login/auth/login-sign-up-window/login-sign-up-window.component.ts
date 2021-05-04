import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {Store} from "@ngrx/store";
import {AppGrumatoState} from "../../../store/app-grumato.state";
import {IsAvailableUserName, SignInUser} from "../../../store/login-store/login-page.actions";

@Component({
  selector: 'app-login-sign-up-window',
  templateUrl: './login-sign-up-window.component.html',
  styleUrls: ['./login-sign-up-window.component.scss']
})
export class LoginSignUpWindowComponent implements OnInit {
  userName: string;
  password: string;
  userType: string;
  isName: boolean = false;

  constructor(protected ref: NbDialogRef<LoginSignUpWindowComponent>, private dialogService: NbDialogService,
              private toastrService: NbToastrService, private store: Store<AppGrumatoState>) {
  }

  ngOnInit(): void {

  }

  submit() {
    if (!this.userName) {
      this.isName = true
    }
    if (this.userName && this.password) {
      this.ref.close({name: this.userName, password: this.password, userType: this.userType || 'USER'});
    } else {
      this.toastrService.danger("Please write Login / Password", "Attention", {duration: 2000})
    }
  }

  cancel() {
    this.ref.close();
  }

  isChange(element: HTMLElement) {
    switch (element.id) {
      case 'userName': this.isAvailableName(element);
      break;
      case "userPassword": this.changeStyleInput(element);
      break;
    }
  }

  private changeStyleInput(element) {
    element.value ? element.style.border = '1px solid green' : element.style.border = '1px solid red'
  }

  private isAvailableName(element) {
    this.store.dispatch(new IsAvailableUserName(element.value))
  }
}

