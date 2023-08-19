import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDyamicDialogComponent } from './product-dyamic-dialog/product-dyamic-dialog.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProductsListComponent,
    ProductDyamicDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
