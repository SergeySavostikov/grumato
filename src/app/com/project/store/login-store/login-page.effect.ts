import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {IsAvailableUserName, LoginPageActions, LoginUser, SignUpUser} from './login-page.actions';
import {map, switchMap} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';

@Injectable()
export class LoginPageEffect {


  constructor(private actions$: Actions,
              private router: Router,
              private httpService: HttpService,
              private toasterService: NbToastrService) {
  }

  @Effect({dispatch: false})
  signUpUser$ = this.actions$.pipe(
    ofType<SignUpUser>(LoginPageActions.SignUpUser),
    switchMap((action) => {
      return this.httpService.signUpUserData(action.payload);
    }),
    map((value) => {
      if ((value as { status: string, code: string }).status == 'success') {
        this.toasterService.success(
          'Done',
          'Creating'
        );
      } else {
        this.toasterService.danger(
          'Error',
          'Creating'
        );
      }
    })
  );

  @Effect({dispatch: false})
  signInUser$ = this.actions$.pipe(
    ofType<LoginUser>(LoginPageActions.Login),
    map((action) => {
      this.httpService.signInUserData(action.payload).subscribe(value => {
        if ((value as { status: string, code: string }).status == 'true') {
          this.router.navigate(['/view']);
        } else {
          this.toasterService.danger(
            'Error',
            'Authorisation'
          );
        }
      });
    })
  );

  @Effect({dispatch: false})
  isAvailableUserName$ = this.actions$.pipe(
    ofType<IsAvailableUserName>(LoginPageActions.IsAvailableUserName),
    switchMap((action) => {
      return this.httpService.isAvailableUserName(action.payload)
    }),
    map(value => console.log(value))
  );
}
