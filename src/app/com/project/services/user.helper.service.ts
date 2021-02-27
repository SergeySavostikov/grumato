import {Injectable} from "@angular/core";
import {Employees} from "../components/component-models/users-model/user.model";
import {OrderEntry} from "../components/component-models/orders-model/order.model";

@Injectable()
export class UserHelperService {

  convertUserProject(userProjectIds: string[]): string {
    return userProjectIds.toString();
  }

  convertOrderIdsToOrderNameForUsers(projectIds: string, orders: OrderEntry[]): string {
    let orderIds: string[] = projectIds.split(','), result: string[] = [];
    for (let projectId of orderIds) {
      let orderEntry = orders.find(order => order.orderCode === parseInt(projectId));
      result.push(orderEntry.orderName);
    }
    return this.convertUserProject(result);
  }
}
