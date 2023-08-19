import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/shared/_models/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /** isLoading */
  public isLoading = false;
  /** loginForm */
  public loginForm!: FormGroup;
  /** errorMsg */
  public errorMsg: string = '';
  /** authStatusSub$ */
  authStatusSub$: Subscription = new Subscription();
  /** authSub$ */
  authSub$: Subscription = new Subscription();
  /**
   * constructor
   * @param {AuthService} authService 
   * @param {FormBuilder} formBuilder 
   * @param {Router} router 
   */
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  /** ngOnInit */
  ngOnInit() {
    this.authStatusSub$ = this.authService
      .getAuthStausListenner()
      .subscribe((isAuth) => {
        this.isLoading = false;
      });
    this.initLoginForm();
  }

  /**
   * initLoginForm
   * @description function to init form
   * @returns void
   */
  public initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * onLogin
   * @description function to handle login 
   * @returns void
   */
  onLogin(): void {
    this.isLoading = true;
    this.authSub$.add(
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((role: string) => {
        this.isLoading = false;
        if (role) {
          this.errorMsg = '';
          if (role === Role.User) {
            this.router.navigate(["/"]);
          } else if (role === Role.Admin) {
            this.router.navigate(["/admin"]);
          }
        } else {
          this.errorMsg = 'please enter valid user name or password!'
        };
      },
        (error) => {
          this.isLoading = true;
          this.authService.authSatusListenner.next(false);
        })

    )
  }

  /** ngOnDestroy */
  ngOnDestroy(): void {
    this.authStatusSub$.unsubscribe();
    this.authSub$.unsubscribe()
  }

}
