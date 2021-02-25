import { Component, OnInit } from '@angular/core';
import { User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  public loginWindow (): void {
    this.mainService.loginWindow = true;
  }

  public registrationWindow (): void {
    this.mainService.registrationWindow = true;
  }

  get user (): User {
    return this.mainService.user;
  }

  get subscriptionsCount (): number {
    return this.mainService.subscriptions.length;
  }

  public exit () {
    localStorage.removeItem('MAATUser');
    this.mainService.user = undefined;
    this.mainService.navigate('title');
  }

}
