import { Subscription } from "rxjs";
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Role } from "../../shared/_models/role";

import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleNav = new EventEmitter();

  /** isAuthenticated */
  isAuthenticated: boolean = false;
  /** authSub */
  private authSub!: Subscription;
  /** isAdmin */
  isAdmin: boolean = false;

  /**
   * constructor
   * @param {AuthService} authService 
   * @param {TranslateService} translateService
   */
  constructor(
    private authService: AuthService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  /**  ngOnInit */
  ngOnInit(): void {
    this.authService.getUerListenner().subscribe((userRole) => {
      this.isAdmin = Role.Admin === userRole ? true : false;
    });
    this.authSub = this.authService
      .getAuthStausListenner()
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      })
  }

  /**
   * onToggle
   * @description function to toggle nav bar
   */
  public onToggle(): void {
    this.toggleNav.emit()
  }

  /**
   * onLogout
   * @description function to handle logout
   * @returns void
   */
  onLogout(): void {
    this.authService.logout()
  }

  /**
   * toggleLanguage
   * @description function to handle translation toggle
   * @returns void
   */
  toggleLanguage(): void {
    if (this.translate.currentLang === 'en') {
      this.translate.use('ar');
      document.body.dir = 'rtl';
    } else {
      this.translate.use('en');
      document.body.dir = 'ltr';
    }
  }

  /** ngOnDestroy */
  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
