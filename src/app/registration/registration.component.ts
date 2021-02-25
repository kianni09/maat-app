import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RegistrationForm, User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public loginValidation = new Subject<string>();
  public startLoginCheck: boolean = false;
  public loginCheck: boolean = false;
  public loginChechResult: string = ""

  public companyIDValidation = new Subject<string>();
  public startCompanyIDCheck: boolean = false;
  public companyIDCheck: boolean = false;
  public companyIDChechResult: string = ""

  constructor(private mainService: MainService) {
    this.loginValidation.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value) => {
      if (value.length >= 4) {
        this.mainService
          .loginValidation$(value)
          .subscribe((result: boolean) => {
            this.startLoginCheck = true;
            this.loginCheck = result;
            this.loginChechResult = result ? 'Реєстрація можлива' : 'Користувач вже існує';
          });
      }
    });

    this.companyIDValidation.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value) => {
      if (value.length >= 4) {
        this.mainService
        .companyIDValidation$(value)
        .subscribe((result: boolean) => {
          this.startCompanyIDCheck = true;
          this.companyIDCheck = result;
          this.companyIDChechResult = result ? 'Ключ підтверджено' : 'Невірний ключ';
        });
      }
    });
  }

  ngOnInit(): void {
  }



  public loadBar: boolean = false;
  public errorMessage: boolean = false;
  public doneMessage: boolean = false;

  public registrationForm: RegistrationForm = {
    login: "",
    password: "",
    name: "",
    companyID: ""
  }

  public registrationAcception(): boolean {
    return this.registrationForm.name.length > 1 && this.registrationForm.companyID.length > 0 && this.registrationForm.login.length >= 4 && this.registrationForm.password.length >= 6 && this.companyIDCheck && this.loginCheck
  }

  public registration() {
    if (this.registrationAcception()) {
      this.loadBar = true;
      this.mainService.registration$(this.registrationForm).subscribe((result: boolean) => {
        if (result) {
          this.loadBar = false;
          this.doneMessage = true;
          this.registrationForm = {
            login: "",
            password: "",
            name: "",
            companyID: ""
          }
        } else {
          this.loadBar = false;
          this.errorMessage = true;
        }

      })
    }
  }

  public closeLogin() {
    this.mainService.registrationWindow = false;
  }

}
