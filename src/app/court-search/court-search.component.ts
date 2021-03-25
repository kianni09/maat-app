import { Component, OnInit } from '@angular/core';
import { Case, User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-court-search',
  templateUrl: './court-search.component.html',
  styleUrls: ['./court-search.component.scss']
})
export class CourtSearchComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  public clearSearch(): void {
    this.searchValue = '';
  }

  public scrollTop(): void {
    if (document.querySelector('div.subscription-block')) {
      let sc = document.querySelector('div.subscription-block');
      sc.scrollTop = 0;
    }
  }

  public search(): void {
    if (!this.searchValue) return
    this.onLoad = true;
    this.mainService.searchCourtCasesStatus$(this.searchValue).subscribe(
      (cases: Case[]) => {
        this.resultSearch = cases;
        this.onLoad = false;
        this.scrollTop();
      }
     )
  }

  public openDocuments(number: string) {
    this.mainService.notificationsToOpen = {
      companyID: this.user.companyID,
      number: number,
      notificationID: 0,
    };
    this.mainService.documentsWindow = true;
  }

  public searchValue: string = "";

  public onLoad: boolean = false;

  resultSearch: Case[] = [];

}
