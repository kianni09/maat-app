import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private mainService: MainService) { }

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

}
