import { Component, OnInit } from '@angular/core';
import { CompanyShort, User } from '../main.models';
import { MainService } from '../main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.scss']
})
export class CompanySearchComponent implements OnInit {

  public placeholderInfo: string = "ЄДРПОУ, назва, власник або керівник"
  public searchResult: CompanyShort[] = [];
  public loadData: boolean = false;

  public searchFormGroup: FormGroup = new FormGroup( {
    "searchField": new FormControl( "", [Validators.required, Validators.minLength(3)])
  });

  constructor( private mainService: MainService ) { }

  ngOnInit(): void {
  }

  get user(): User {
    return this.mainService.user;
  }

  private edrpouCheck (data: string): string {
    let pattern = /^\d+$/;
    if (pattern.test(data)) {
      return "0".repeat(8 - data.length) + data;
    }
    return data;
  }

  public search (): void {
    this.loadData = true;
    let searchData: string = this.edrpouCheck(this.searchFormGroup.controls["searchField"].value);
    console.log(searchData);
    if (this.loadData) {
      this.mainService.searchCompany$(searchData).subscribe( (result: CompanyShort[]) => {
        this.searchResult = result;
        console.log(result);
        this.loadData = false;
      });
    }
  }

  public openCompanyDocument (hash: string): void {
    this.mainService.selectedCompany = {
      hash_key: hash,
      user_id: this.user.userID
    };
    this.mainService.companyDocumentWindow = true;
  }

}
