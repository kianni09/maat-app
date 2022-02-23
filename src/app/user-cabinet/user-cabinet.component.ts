import { Component, OnInit } from '@angular/core';
import { User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit {

  public user: User = undefined;

  constructor(private mainService: MainService) {
    this.mainService.userSubject$.subscribe( (user: User) => {
      this.user = user;
    } )
  }

  ngOnInit(): void {
  }

  public openChangePasswordWindow (): void {
    console.log("Test")
    this.mainService.changePasswordWindow = true;
  }

}
