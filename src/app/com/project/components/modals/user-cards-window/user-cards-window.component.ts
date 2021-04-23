import {Component, OnInit, TemplateRef} from '@angular/core';
import {Employees} from '../../component-models/users-model/user.model';
import {NbDialogRef, NbDialogService, NbSelectComponent} from '@nebular/theme';
import {CustomerEntry} from '../../component-models/customers-model/customer.model';
import {OrderEntry} from '../../component-models/orders-model/order.model';
import {UserHelperService} from '../../../services/user.helper.service';
import {GenerateReportViewComponent} from '../generate-report-view/generate-report-view.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-user-cards-window',
  templateUrl: './user-cards-window.component.html',
  styleUrls: ['./user-cards-window.component.css']
})
export class UserCardsWindowComponent implements OnInit {

  user: Employees;
  users: Employees[];
  customer: CustomerEntry;
  order: OrderEntry;
  orders: OrderEntry[];
  selectedOrder: string[] = [];

  base64: string = "Base64...";
  fileSelected?: Blob;
  imageUrl?: string = "";

  image: any = '../../../../../../assets/images/default_avatar.jpg';

  constructor(protected ref: NbDialogRef<UserCardsWindowComponent>,
              private userHelperService: UserHelperService,
              private dialogService: NbDialogService,
              private sant: DomSanitizer) {
  }

  ngOnInit(): void {}

  //ToDo -> services -> user.helper.service
  onSelectNewFile(files: FileList): void {
    this.fileSelected = files[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    this.base64 = "Base64..."
  }

  //ToDo -> services -> user.helper.service
  convertFileToBase64(): void{
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onload = () => {
      this.base64 = reader.result as string;
    };
  }

  showAvatar(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  edit() {
    if (this.user) {
      this.user.userAvatar = this.base64;
      this.ref.close({
        user: this.user,
      });
    }
    if (this.customer) {
      this.ref.close({
        customer: this.customer
      });
    }
    if (this.order) {
      this.ref.close({
        order: this.order
      });
    }
  }

  cancel() {
    this.ref.close(false);
  }

  changeSurname(surname: HTMLInputElement) {
    if (this.user) {
      this.user.surname = surname.value;
    }
    if (this.customer) {
      this.customer.surname = surname.value;
    }
    if (this.order) {

    }
  }

  changeName(name: HTMLInputElement) {
    if (this.user) {
      this.user.name = name.value;
    }
    if (this.customer) {
      this.customer.name = name.value;
    }
    if (this.order) {

    }
  }

  changePatronymic(patronymic: HTMLInputElement) {
    this.user.patronymic = patronymic.value;
  }

  changePhoneNumber(phoneNumber: HTMLInputElement) {
    this.user.phoneNumber = phoneNumber.value;
  }

  changeDirection(direction: HTMLInputElement) {
    this.user.direction = direction.value;
  }

  onConvertUserProject(orderIds: string): string {
    return this.userHelperService.convertOrderIdsToOrderNameForUsers(orderIds, this.orders);
  }

  onChangeSelectedOrder(selectedOrders: NbSelectComponent) {
    this.selectedOrder = selectedOrders.selected;
  }

  changeImage() {
    this.image = '../../../../../../assets/images/alternative_avatar.jpg';
  }

  generatePersonalReport() {
    this.dialogService.open(GenerateReportViewComponent, {}).onClose.subscribe();
  }
}
