import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginForm, RegistrationForm, User, Subscription } from './main.models';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) {
    this.UserLoad();
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public user: User;
  public loginWindow: boolean = false;
  public registrationWindow: boolean = false;
  public subscriptionWindow: boolean = false;

  private UserLoad() {
    if (localStorage.getItem('MAATUser')) {
      this.getUserData$(localStorage.getItem('MAATUser')).subscribe(
        (user: User) => {
          console.log(user);
          this.user = user;
          this.getSubscriptions$(user.companyID);
          this.router.navigate(['main']);
        }
      );
    } else {
      this.router.navigate(['title']);
    }
  }

  public getUserData$(userID: string): Observable<any> {
    return this.http.get(environment.getUserData + userID);
  }

  public login$(loginForm: LoginForm): Observable<any> {
    return this.http.post(environment.login, loginForm);
  }

  public loginValidation$(login: string): Observable<any> {
    return this.http.get(environment.checkUserLogin + login);
  }

  public companyIDValidation$(companyID: string): Observable<any> {
    return this.http.get(environment.checkCompanyID + companyID);
  }

  public registration$(registrationForm: RegistrationForm): Observable<any> {
    return this.http.post(environment.registration, registrationForm);
  }

  public subscriptions: Subscription[] = []
  public subscriptions$: Subject<Subscription[]> = new Subject();

  public getSubscriptions$(companyID: string): void {
    this.http
      .get(environment.getSubscriptions + companyID)
      .subscribe((subscriptions: Subscription[]) => {
        console.log(subscriptions);
        this.subscriptions = subscriptions;
        this.subscriptions$.next(
          this.subscriptions.map((subscription: Subscription) => {
            return { ...subscription, open: false };
          })
        );
      });
  }
}
