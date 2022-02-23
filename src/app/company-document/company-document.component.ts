import { Component, OnInit } from '@angular/core';
import { User, Company, MonitoringAction } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-company-document',
  templateUrl: './company-document.component.html',
  styleUrls: ['./company-document.component.scss']
})
export class CompanyDocumentComponent implements OnInit {

  public dataLoad: boolean = false;
  public company: Company = undefined;
  public comaReplacePattern = /,/gi;

  constructor(private mainService: MainService) {
    this.mainService.getCompany$(this.mainService.selectedCompany)
    .subscribe( (company: Company) => {
      this.company = company;
      this.dataLoad = true;
    } )
   }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  public monitoringAction(): void {
    let sendInfo: MonitoringAction = {
      user_id: this.user.userID,
      key: this.company.edrpou
    }
    if (this.company.monitoring) {
      this.mainService.deleteCompanyFromMonitoring$(sendInfo).subscribe( (result: boolean) => {
        console.log(result);
        this.company.monitoring = result;
      } );
    } else {
      this.mainService.addCompanyToMonitoring$(sendInfo).subscribe( (result: boolean) => {
        console.log(result);
        this.company.monitoring = result;
      } );
    }
  }

  public closeWindow(){
    this.mainService.selectedCompany = undefined;
    this.mainService.companyDocumentWindow = false;
  }

}
