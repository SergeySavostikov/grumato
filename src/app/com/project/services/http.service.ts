import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpModel} from '../login/login-model/sign-up.model';
import {LoginModel} from '../login/login-model/login.model';
import {Employees} from '../components/component-models/users-model/user.model';
import {OrderEntry} from '../components/component-models/orders-model/order.model';
import {CustomerEntry} from '../components/component-models/customers-model/customer.model';
import {NbToastrService} from '@nebular/theme';
import {Observable} from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
              private toasterService: NbToastrService) {
  }

  getUserData() {
    return this.http.get('http://localhost:8080/users');
  }

  signUpUserData(userData: SignUpModel) {
    return this.http.post('http://localhost:8080/login/add', {login: {
      userName: userData.userName, userPassword: userData.password, userType: userData.userType
      }})
  }

  signInUserData(loginData: LoginModel){
    return this.http.post('http://localhost:8080/login/auth', {login: {
        userName: loginData.userName, userPassword: loginData.password
      }})
  }

  isAvailableUserName(userName: string) {
    return this.http.post('http://localhost:8080/login/isAvailableUserName', {login: {
      userName: userName
      }})
  }


  getCustomers(){
    return this.http.get("http://localhost:8080/customers", {headers: {"Content-type": "application/json"}})
  }
  postCustomer(customer: CustomerEntry) {
    let body = {
      customer: customer
    };
    let value = JSON.stringify(body);
    console.log("value...");
    console.log(value);
    return this.http.post("http://localhost:8080/customers/add", value, {headers: {"Content-type": "application/json"}})
  }
  deleteCustomer(value: CustomerEntry) {
    let body = {
      customer: value
    };
    let s = JSON.stringify(body);
    console.log("delete");
    console.log(value);
    return this.http.post("http://localhost:8080/customers/delete", s, {headers: {"Content-type": "application/json"}})
  }
  getOrders(){
    return this.http.get("http://localhost:8080/orders", {headers: {"Content-type": "application/json"}})
  }

  postOrders(order: OrderEntry) {
    let body = {
      order: order
    };
    let value = JSON.stringify(body);
    console.log("value...");
    console.log(value);
    return this.http.post("http://localhost:8080/orders/add", value, {headers: {"Content-type": "application/json"}})
  }

  deleteOrder(value: OrderEntry) {
    let body = {
      order: value
    };
    let s = JSON.stringify(body);
    console.log("delete");
    console.log(value);
    return this.http.post("http://localhost:8080/orders/delete", s, {headers: {"Content-type": "application/json"}})
  }

  getUsers(): Observable<any>{
    return this.http.get("http://localhost:8080/users", {headers: {"Content-type": "application/json"}}) as Observable<any>;
  }
  postUsers(user:Employees) {
    let body = {
      employees: user
    };
    let value = JSON.stringify(body);
    console.log(value);
    return this.http.post("http://localhost:8080/users/add", value, {headers: {"Content-type": "application/json"}})
  }

  deleteUser(value: Employees): Observable<any> {
    let body = {
      employees: value
    };
    let s = JSON.stringify(body);
    console.log("delete");
    console.log(value);
    return this.http.post("http://localhost:8080/users/delete", s, {headers: {"Content-type": "application/json"}})
  }

  getAllData() {
    return this.http.get('http://localhost:8080/data', {headers: {"Content-type": "application/json"}})
  }
}
