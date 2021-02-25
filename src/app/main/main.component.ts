import { Component, OnInit } from '@angular/core';
import { Subscription, User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private mainService: MainService) {
    this.mainService.getSubscriptions$(this.user.companyID)
    .subscribe( (subscriptions: Subscription[]) => {
      console.log(subscriptions);
      this.mainService.subscriptions = subscriptions;
    } )
   }

  ngOnInit(): void {
  }

  get user (): User {
    return this.mainService.user;
  }

  get subscriptions (): Subscription[] {
    return this.mainService.subscriptions;
  }

}
