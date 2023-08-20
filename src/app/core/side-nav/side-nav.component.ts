import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Role } from 'src/app/shared/_models/role';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();
  isAuthenticated = false;
  /** authSub */
  private authSub!: Subscription;
  /** isAdmin */
  isAdmin: boolean = false;
  /**
   * constructor
   * @param {AuthService} authService 
   */
  constructor(private authService: AuthService) { }

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

  onCloseSidenav() {
    this.closeSidenav.emit();
  }


  onLogout() {
    this.authService.logout();
  }
}
