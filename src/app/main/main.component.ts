import { Component, OnInit } from '@angular/core';
import { Subscription, User, Notification } from '../main.models';
import { MainService } from '../main.service';
import { Table } from '../table.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private mainService: MainService) {
    this.mainService.subscriptions$.subscribe(
      (subscriptions: Subscription[]) => {
        this.subscriptions = new Table(subscriptions);
        this.subscriptions.pageSize = 30;
      }
    );
  }

  ngOnInit(): void {}

  get user(): User {
    return this.mainService.user;
  }

  public subscriptions: Table = undefined;

  public clearSearch(): void {
    this.subscriptions.searchValue = '';
    this.subscriptions.OnSearchInit.next('');
  }

  public scrollTop(): void {
    let sc = document.querySelector('div.subscription-block');
    sc.scrollTop = 0;
  }

  public getUnreadNotificationsCount(notifications: Notification[]): number {
    return notifications.filter((notification) => {
      return !notification.read;
    }).length;
  }

  public checkUsersInside(users: User[]): boolean {
    return users.some( (user: User) => {
      return user.userID === this.user.userID;
    } )
  }
}
