import { Component, OnInit } from '@angular/core';
import { SubscriptionAddForm, SubscriptionAddAnswer, SelectionItem, User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  public loadBar: boolean = false;
  public errorMessage: boolean = false;

  public monitoringTypes: SelectionItem[] = [
    {
      name: "Моніторинг за учасником судової справи",
      value: "court-by-involved"
    },
    {
      name: "Моніторинг за номером судової справи",
      value: "court-by-number"
    },
    {
      name: "Моніторинг за стороною: позивач",
      value: "court-by-plaintiffs"
    },
    {
      name: "Моніторинг за стороною: відповідач",
      value: "court-by-defendants"
    },
    {
      name: "Моніторинг за стороною: третя строна",
      value: "court-by-third"
    }
  ]
  public selectedType: string = this.monitoringTypes[0].value;
  public monitoringObjects: string = ""
  public mobitoringObjectsDescriptions: string = "Введіть об'єкт моніторингу: номер справи, ПІБ особи або назву організації (назву організації потрібно вводити без форми власності, наприклад Рога та Копита, а не ТОВ Рога та Копита). \nМожливо внесення декілька об'єктів - кожен з нової строки."
  public description: string = "";


  public send(): void {
    if (this.selectedType && this.monitoringObjects) {
      this.loadBar = true;
      let toSend: SubscriptionAddForm = {
        companyID: this.user.companyID,
        type: this.selectedType,
        targets: this.monitoringObjects.split("\n"),
        description: this.description,
        user: {
          userID: this.user.userID,
          name: this.user.name
        }
      }
      console.log(toSend);
      this.mainService.addNewSubscription$(toSend).subscribe((result: SubscriptionAddAnswer) => {
        if (result.result === "inserted") {
          console.log(result)
          this.mainService.getSubscriptions$(this.user.companyID);
          this.closeWindow();
        } else {
          this.loadBar = false;
          this.errorMessage = true;
        }

      })
    }
  }

  public closeWindow() {
    this.mainService.subscriptionWindow = false;
  }

}
