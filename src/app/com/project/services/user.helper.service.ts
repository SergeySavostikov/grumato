import {Injectable} from '@angular/core';
import {OrderEntry} from '../components/component-models/orders-model/order.model';

@Injectable()
export class UserHelperService {

  convertUserProject(userProjectIds: string[]): string {
    return userProjectIds.toString();
  }

  convertOrderIdsToOrderNameForUsers(projectIds: string, orders: OrderEntry[]): string {
    const orderIds: string[] = projectIds.split(','), result: string[] = [];
    for (let projectId of orderIds) {
      const orderEntry = orders.find(order => order.orderCode === parseInt(projectId));
      if (orderEntry) {
        result.push(orderEntry.orderName);
      }
    }
    return this.convertUserProject(result);
  }

  static biggerArrLength(arrUser: any[], arrOrder: any[], arrCustomer: any[]): number {
    if (arrUser.length > arrOrder.length && arrUser.length > arrCustomer.length) {
      return arrOrder.length;
    }
    if (arrOrder.length > arrUser.length && arrOrder.length > arrCustomer.length) {
      return arrOrder.length;
    }
    if (arrCustomer.length > arrUser.length && arrCustomer.length > arrOrder.length) {
      return arrCustomer.length;
    }
  }
}
