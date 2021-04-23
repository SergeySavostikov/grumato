import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {AppGrumatoState} from "../../store/app-grumato.state";
import {GetAllDataLoad} from "../components-store/components.action";
import {NbDialogService} from '@nebular/theme';
import {UserCardsWindowComponent} from '../modals/user-cards-window/user-cards-window.component';

@Component({
  selector: 'app-grumato-view',
  templateUrl: './grumato-view.component.html',
  styleUrls: ['./grumato-view.component.css']
})
export class GrumatoViewComponent implements OnInit {

  constructor(private router: Router,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['']);
  }

  showUserInformation() {
    this.dialogService.open(UserCardsWindowComponent).onClose.subscribe();
  }

  tabs: any[] = [
    {
      title: 'Users',
      route: 'users',
    },
    {
      title: 'Orders',
      responsive: true,
      route: 'orders',
    },
    {
      title: 'Customers',
      responsive: true,
      route: 'customers',
    }
  ];

}
