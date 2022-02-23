import { Component, OnInit } from '@angular/core';
import { User, Subscription } from '../main.models';
import { MainService } from '../main.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private mainService: MainService, private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  public loginWindow(): void {
    this.mainService.loginWindow = true;
  }

  public registrationWindow(): void {
    this.mainService.registrationWindow = true;
  }

  get userOnLoad(): boolean {
    return this.mainService.userOnLoad;
  }

  get user(): User {
    return this.mainService.user;
  }

  get lineWidth (): string {
    return (this.subscriptionsCount / this.user.queryLimit) * 100 + "%"
  }

  get subscriptionsCount(): number {
    return this.mainService.subscriptions.filter((subscription: Subscription) => { return !subscription.delete }).length;
  }

  public menuHeaders = {
    start: {
      title: "MAAT - Про сервіс",
      user: "MAAT - Кабінет користувача"
    },
    company: {
      search: "Реєстр юридичних осіб - Пошук",
      monitoring: "Реєстр юридичних осіб - Моніторинг"
    },
    "court": {
      search: "Реєстр судових рішень - Пошук"
    },
    "court-status": {
      search: "Стан розгляду судових справ - Пошук",
      monitoring: "Стан розгляду судових справ - Моніторинг"
    },
    "debt": {
      search: "Реєстр боржників та АСВП - Пошук",
      monitoring: "Реєстр боржників та АСВП - Моніторинг"
    }
  }

  get path(): string[] {
    return this.location.path().split('/')
  }

  get menuStatus(): boolean {
    return this.mainService.menuStatus;
  }

  public menuAction(): void {
    this.mainService.menuStatus = !this.mainService.menuStatus;
    console.log(this.path)

  }

  public openCabinet(): void {
    this.router.navigate(['start/user']);
  }


  public exit() {
    localStorage.removeItem('MAATUser');
    this.mainService.user = undefined;
    this.mainService.navigate('title');
  }

}
