import { Component, OnInit } from '@angular/core';
import { Case, DocumentsForm, Document } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor(private mainService: MainService) {
    this.mainService.getDocuments(this.documentsForm).subscribe( (c: Case) => {
      this.case = c;
      console.log(c)
      this.dataLoad = true;
    } )

   }

  ngOnInit(): void {
  }

  get documentsForm(): DocumentsForm {
    return this.mainService.notificationsToOpen;
  }

  public dataLoad: boolean = false;
  public case: Case = undefined;

  public documentsList( first: Document[], appeals: Document[], cassations: Document[] ): Document[] {
    return first.concat(appeals, cassations)
  }

  public openLink(link: string) {
    window.open(link, "_blank");
  }

  public closeWindow(){
    this.mainService.notificationsToOpen = undefined;
    this.mainService.documentsWindow = false;
  }

}
