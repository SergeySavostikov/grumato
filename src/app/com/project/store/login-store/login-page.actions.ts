import {Action} from '@ngrx/store';
import {LoginModel} from "../../login/login-model/login.model";
import {SignUpModel} from '../../login/login-model/sign-up.model';

export enum LoginPageActions {
  Login = '[Login] Login User',
  SignUpUser = '[Login] Sign Up User',
  SignInUser = '[Login] Sign In User',
  IsAvailableUserName = '[Login] Is Available User Name',
}

export class LoginUser implements Action {
  public readonly type = LoginPageActions.Login;

  constructor(public payload: LoginModel) {
  }
}

export class SignUpUser implements Action {
  public readonly type = LoginPageActions.SignUpUser;

  constructor(public payload: SignUpModel) {
  }
}

export class SignInUser implements Action {
  public readonly type = LoginPageActions.SignInUser;

  constructor(public payload: LoginModel) {
  }
}

export class IsAvailableUserName implements Action {
  public readonly type = LoginPageActions.IsAvailableUserName;

  constructor(public payload: string) {
  }
}

export type LoginActions = LoginUser | SignUpUser | SignInUser | IsAvailableUserName
