import { Component, OnInit } from '@angular/core';
import { MonitoringReportForm, SelectionItem, Subscription, User, Notification, ReportFileName } from '../main.models';
import { MainService } from '../main.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-court-report',
  templateUrl: './court-report.component.html',
  styleUrls: ['./court-report.component.scss']
})
export class CourtReportComponent implements OnInit {

  constructor(private mainService: MainService) {
    let dates: string[] = [];
    this.mainService.subscriptions.forEach((subscription: Subscription) => {
      subscription.notifications.forEach((notification: Notification) => {
        if (!dates.includes(notification.date)) dates.push(notification.date)
      })
    });
    this.dates = dates.sort((a, b) => {
      if (b > a) {
        return 1
      } else if (a > b) {
        return -1
      } else {
        return 0
      }
    }).map((date: string) => {
      return {
        name: date,
        value: date
      }
    });
  }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  public dates: SelectionItem[] = [];
  public selectedDate: string;

  public loadBar: boolean = false;

  public send(): void {
    if (this.selectedDate) {
      this.loadBar = true;
      let toSend: MonitoringReportForm = {
        companyID: this.user.companyID,
        date: this.selectedDate
      }
      console.log(toSend);
      this.mainService.downloadCourtReport(toSend).subscribe((result: ReportFileName) => {
        window.open(environment.downloadReport + result.file);
        this.closeWindow();
      })
    }
  }

  public closeWindow() {
    this.mainService.reportWindow = false;
  }

}
