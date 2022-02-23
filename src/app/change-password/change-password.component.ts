import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { LoginForm } from '../main.models';
import { FormGroup, FormControl, AbstractControl, Validators, ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public loadBar: boolean = false;

  public passwordFormGroup: FormGroup = new FormGroup( {
    "password": new FormControl( "", [Validators.required, Validators.minLength(8)]),
    "passwordRepeat": new FormControl("")
  },
  {validators: passwordEqual} );

  constructor( private mainService: MainService) {

   }

  ngOnInit(): void {
  }

  public closeWindow(): void {
    this.mainService.changePasswordWindow = false;
  }

  public submitChangePassword (): void {
    this.loadBar = true;
    let user: LoginForm = {
      login: this.mainService.user.login,
      password: this.passwordFormGroup.controls['password'].value
    }
    this.mainService.changeUserPassword$(user).subscribe( (result: boolean) => {
      if (result) {
        this.closeWindow();
      }
    } )
  }

  public passwordsCompare(): boolean {
    return this.passwordFormGroup.errors ? this.passwordFormGroup.errors["passwordsNoEqual"] : false;
  }

}

export function passwordEqual (control: AbstractControl): ValidationErrors | null {
  return control.get("password").value === control.get("passwordRepeat").value ? null : {"passwordsNoEqual": true};
}
