import { Component, OnInit } from '@angular/core';
import { Case, DebtItem, DebtSearchAnswer, DebtSearchForm, DebtSearchFormItem, User } from '../main.models';
import { MainService } from '../main.service';
import * as moment from 'moment';

@Component({
  selector: 'app-debt-search',
  templateUrl: './debt-search.component.html',
  styleUrls: ['./debt-search.component.scss']
})
export class DebtSearchComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  public search(): void {
    if (!this.searchValue) return
    this.onLoad = true;
    if (this.phizSearchForm.BirthDateV) this.phizSearchForm.BirthDate = this.phizSearchForm.BirthDateV.split(".").reverse().join("-") + "T00:00:000Z";
    let data: DebtSearchForm = {
      searchType: this.categorySwitcher?"1":"2",
      paging: "1",
      reCaptchaToken: "",
      filter: this.categorySwitcher ?
      {
        "LastName": this.phizSearchForm.LastName.trim(),
        "FirstName": this.phizSearchForm.FirstName.trim(),
        "MiddleName": this.phizSearchForm.MiddleName.trim(),
        "BirthDate": this.phizSearchForm.BirthDate.trim(),
        "BirthDateV": this.phizSearchForm.BirthDateV.trim(),
        "IdentCode": this.phizSearchForm.IdentCode.trim(),
        "categoryCode": this.phizSearchForm.categoryCode.trim()
      }
      : {
        FirmEdrpou: this.uoSearchForm.FirmEdrpou.trim(),
        FirmName: this.uoSearchForm.FirmName.trim(),
        categoryCode: this.uoSearchForm.categoryCode.trim(),
      }

    }
    console.log(data);

    this.mainService.searchDebt$(data).subscribe(
      (result: DebtSearchAnswer) => {
        this.resultSearch = result.results;
        console.log(this.resultSearch);
        this.onLoad = false;
      }
    )
  }

  public clear(): void {
    this.phizSearchForm = {
      "LastName": "",
      "FirstName": "",
      "MiddleName": "",
      "BirthDate": "",
      "BirthDateV": "",
      "IdentCode": "",
      "categoryCode": ""
    }
    this.uoSearchForm = {
      FirmEdrpou: "",
      FirmName: "",
      categoryCode: "",
    }
  }

  get searchValue(): number {
    return (Object.values(this.phizSearchForm).join("") + Object.values(this.uoSearchForm).join("")).length
  };

  public onLoad: boolean = false;

  resultSearch: DebtItem[] = [];

  public showSearchFields: boolean = true;
  public swipeSearchCategories(result: boolean): void {
    this.clear();
    this.categorySwitcher = result;
  }

  public swipeSearchFields(): void {
    this.clear();
    this.showSearchFields = !this.showSearchFields;
  }

  public categorySwitcher: boolean = true;

  public phizSearchForm: DebtSearchFormItem = {
    "LastName": "",
    "FirstName": "",
    "MiddleName": "",
    "BirthDate": "",
    "BirthDateV": "",
    "IdentCode": "",
    "categoryCode": ""
  }

  public uoSearchForm: DebtSearchFormItem = {
    FirmEdrpou: "",
    FirmName: "",
    categoryCode: "",
  }

  public getVPinfo(debt: DebtItem): void {
    if (debt.vpInfo) return debt.vpInfo = undefined;
    this.mainService.getVPinfo$(debt.vpNum).subscribe(
      (result) => {
        console.log(result);
        debt.vpInfo = result;
      }
    )
  }

}
