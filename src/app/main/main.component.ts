import { Component, OnInit } from '@angular/core';
import {
  Subscription,
  User,
  Notification,
  SubscriptionDeleteForm,
  SubscriptionUserForm,
} from '../main.models';
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

  get isMobile(): boolean {
    return window.innerWidth <= 1000;
  }

  public searchShow: boolean = false;
  public buttonsShow: boolean = false;

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
    return users.some((user: User) => {
      return user.userID === this.user.userID;
    });
  }

  get subscriptionsSwitcher(): boolean {
    return this.mainService.subscriptionsSwitcher;
  }

  public switcherAction(action: string): void {
    this.mainService.subscriptionsSwitcher = action === 'self';
    this.mainService.subscriptionsCategory();
    document.querySelector('div.subscription-block') ? this.scrollTop(): undefined;
  }

  get startLoad(): boolean {
    return this.mainService.startLoadSubscriptions;
  }

  public addMonitoringObject(): void {
    this.mainService.subscriptionWindow = true;
  }

  public updateSubscriptions(): void {
    this.mainService.getSubscriptions$(this.user.companyID);
  }

  public createReport(): void {
    this.mainService.reportWindow = true;
  }

  public openDocuments(notification: Notification) {
    this.mainService.notificationsToOpen = {
      companyID: this.user.companyID,
      number: notification.number,
      notificationID: notification._id,
    };
    notification.read = true;
    this.mainService.documentsWindow = true;
  }

  public deleteSubscription(subscription: Subscription): void {
    let data: SubscriptionDeleteForm = {
      subscriptionID: subscription._id,
      companyID: this.user.companyID,
    };
    this.mainService.deleteSubscription(data).subscribe((result) => {
      subscription.open = false;
      subscription.delete = true;
    });
  }

  public addUserToSubscription(subscription: Subscription): void {
    let data: SubscriptionUserForm = {
      subscriptionID: subscription._id,
      companyID: this.user.companyID,
      name: this.user.name,
      userID: this.user.userID,
    };
    this.mainService
      .addUserToSubscription(data)
      .subscribe((result: boolean) => {
        let user: User = {
          name: this.user.name,
          userID: this.user.userID,
        };
        subscription.users.push(user);
      });
  }

  public deleteUserFromSubscription(subscription: Subscription): void {
    let data: SubscriptionUserForm = {
      subscriptionID: subscription._id,
      companyID: this.user.companyID,
      userID: this.user.userID,
    };
    this.mainService
      .deleteUserFromSubscription(data)
      .subscribe((result: boolean) => {
        subscription.users = subscription.users.filter((user) => {
          return user.userID !== this.user.userID;
        });
      });
  }
}
