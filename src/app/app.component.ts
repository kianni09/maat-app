import { Component } from '@angular/core';
import { MainService } from './main.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private mainService: MainService, private location: Location, private router: Router) { }

  get windowOpen (): boolean {
    return this.loginWindow
    || this.registrationWindow
    || this.subscriptionWindow
    || this.documentsWindow
    || this.reportWindow
    || this.changePasswordWindow
    || this.companyDocumentWindow
  }

  get loginWindow () {
    return this.mainService.loginWindow;
  }

  get registrationWindow () {
    return this.mainService.registrationWindow;
  }

  get subscriptionWindow () {
    return this.mainService.subscriptionWindow;
  }

  get documentsWindow () {
    return this.mainService.documentsWindow;
  }
  get reportWindow () {
    return this.mainService.reportWindow;
  }
  get changePasswordWindow () {
    return this.mainService.changePasswordWindow;
  }

  get companyDocumentWindow () {
    return this.mainService.companyDocumentWindow;
  }

  public goTo(location: string): void {
    this.router.navigate([location]);
    this.menuOff();
  }

  get path(): string[] {
    return this.location.path().split('/')
  }

  get menuStatus (): boolean {
    return this.mainService.menuStatus;
  }

  public menuAction(): void {
    this.mainService.menuStatus = !this.mainService.menuStatus;
    console.log(this.path)
  }

  public menuOff(): void {
    if (this.mainService.menuStatus) this.mainService.menuStatus = false;
  }

}
