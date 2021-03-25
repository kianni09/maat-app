import { Component, OnInit } from '@angular/core';
import { MonitoringReportForm, SelectionItem, Subscription, User, Notification, ReportFileName } from '../main.models';
import { MainService } from '../main.service';
import { environment } from '../../environments/environment.prod';
import * as moment from 'moment';


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
        name: moment(date).format("DD.MM.yyyy"),
        value: date
      }
    });
  }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  public selectedDateFrom: string = "";
  public selectedDateTo: string = "";
  public dates: SelectionItem[] = [];
  get datesTo(): SelectionItem[] {
    return this.dates.filter( (date: SelectionItem) => {
      return date.value >= this.selectedDateFrom;
    } )
  }

  public loadBar: boolean = false;

  public send(): void {
    if (this.selectedDateFrom && this.selectedDateTo) {
      this.loadBar = true;
      let toSend: MonitoringReportForm = {
        companyID: this.user.companyID,
        dateFrom: this.selectedDateFrom,
        dateTo: this.selectedDateTo
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
