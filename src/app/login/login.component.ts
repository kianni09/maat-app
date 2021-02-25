import { Component, OnInit } from '@angular/core';
import { LoginForm, User } from '../main.models';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  public loadBar: boolean = false;
  public errorMessage: boolean = false;

  public loginForm: LoginForm = {
    login: "",
    password: ""
  }

  public login () {
    if ( this.loginForm.login.length > 0 && this.loginForm.password.length > 0 ) {
      this.loadBar = true;
      this.mainService.login$(this.loginForm).subscribe( (user: User) => {
        if (user) {
          console.log(user)
          localStorage.setItem('MAATUser', user.userID );
          this.mainService.user = user;
          this.mainService.getSubscriptions$(user.companyID);
          this.mainService.navigate("main");
          this.closeLogin();
        } else {
          this.loadBar = false;
          this.errorMessage = true;
        }

      } )
    }
  }

  public closeLogin(){
    this.mainService.loginWindow = false;
  }

}
