import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { USERS } from 'src/app/config/defines';

/** AuthService */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** userSubject */
  private userSubject: BehaviorSubject<string> = new BehaviorSubject('');
  /** authSatusListenner */
  public authSatusListenner = new BehaviorSubject<boolean>(false);

  public user!: Observable<User | null>;

  /**
   * constructor
   * @param {Router} router 
   */
  constructor(
    private router: Router
  ) { }

  /**
   * getAuthStausListenner
   * @returns {Observable} <boolean>
   */
  public getAuthStausListenner(): Observable<boolean> {
    return this.authSatusListenner.asObservable();
  }

  /**
  * getUerListenner
  * @returns {Observable} <string>
  */
  public getUerListenner(): Observable<string> {
    return this.userSubject.asObservable();
  }

  /**
   * login
   * @description function to handle login and set user role state in local storage
   * @param username 
   * @param password 
   * @returns {Observable} <string>
   */
  public login(username: string, password: string): Observable<string> {
    const user = USERS.find(user => user.username === username && user.password === password);
    if (user) {
      // store user details in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user.role));
      this.userSubject.next(user.role);
      this.authSatusListenner.next(true);
    }
    return this.userSubject.asObservable();
  }

  /**
   * logout
   * @description function to handle user logout and remove user data
   * @returns void
   */
  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next('');
    this.authSatusListenner.next(false);
    this.router.navigate(["/auth/login"])
  }

  /**
   * get userRole
   */
  public get userRole() {
    if (this.userSubject.value) {
      return this.userSubject.value;
    } else {
      const userRole = JSON.parse(localStorage.getItem('user')!) || '';
      this.userSubject.next(userRole);
      return userRole;
    }
  }

  /**
   * autoAuthUser
   * @description this methode to save auth state wehen user reload the app
   * @returns 
   */
  public autoAuthUser(): void {
    const authInformation = JSON.parse(localStorage.getItem('user')!);
    if (!authInformation) {
      return;
    }
    this.authSatusListenner.next(true);
    this.userSubject.next(authInformation);
  }

}
