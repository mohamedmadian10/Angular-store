import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesProductsComponent } from './categories-products/categories-products.component';
import { StoreRoutingModule } from './store-routing.module';



@NgModule({
    declarations: [
        CategoriesProductsComponent,
    ],
    imports: [
        CommonModule,
        StoreRoutingModule,
        SharedModule,
    ]
})
export class StoreModule { }
