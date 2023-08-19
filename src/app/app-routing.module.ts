import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './shared/_models/role';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    loadChildren: () => import('./core/store/store.module').then(m => m.StoreModule),
    canActivate: [authGuard],
  },
  {
    path: "admin",
    loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard],
    data: { roles: [Role.Admin] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
