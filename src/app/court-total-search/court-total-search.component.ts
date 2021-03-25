import { Component, OnInit } from '@angular/core';
import { Case, CaseSearchResult, User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-court-total-search',
  templateUrl: './court-total-search.component.html',
  styleUrls: ['./court-total-search.component.scss']
})
export class CourtTotalSearchComponent implements OnInit {

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

  public search(value: string): void {
    if (!this.searchValue) return
    this.onLoad = true;
    this.mainService.searchCourtCases$(value, 1).subscribe(
      (cases: CaseSearchResult) => {
        console.log(cases);
        this.resultSearch = cases;
        this.onLoad = false;
        this.scrollTop();
      }
     )
  }

  public getCasesByNumber(number: string) {
    this.searchValue = number;
    this.search(number);
  }

  public pageMove(direction: string): void {
    this.onLoad = true;
    let nextPage = direction === "forward" ? this.resultSearch.page + 1 : this.resultSearch.page - 1;
    this.mainService.searchCourtCases$(this.resultSearch.query, nextPage).subscribe(
      (cases: CaseSearchResult) => {
        console.log(cases);
        this.resultSearch = cases;
        this.onLoad = false;
        this.scrollTop();
      }
     )
  }

  public openDocument(link: string) {
    window.open(link, "_blank");
  }

  public searchValue: string = "";

  public onLoad: boolean = false;

  resultSearch: CaseSearchResult = null;

}
