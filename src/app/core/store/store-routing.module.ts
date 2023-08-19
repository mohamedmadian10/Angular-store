import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesProductsComponent } from './categories-products/categories-products.component';

const routes: Routes = [
    { path: "", component: CategoriesProductsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule { }
