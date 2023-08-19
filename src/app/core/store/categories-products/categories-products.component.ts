import { Product } from 'src/app/shared/_models/product.model';
import { ProductsService } from '../../../shared/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.scss']
})
export class CategoriesProductsComponent implements OnInit, OnDestroy {
  /** isLoading */
  public isLoading = false;
  /** categories */
  public catagories: string[] = [];
  /** allProducts */
  public allProducts: Product[] = [];
  /** selecteProducts */
  public selecteProducts: Product[] = [];
  /** productsCategSub$ */
  productsCategSub$: Subscription = new Subscription();

  /**
   * constructor
   * @param {ProductsService} productsService 
   */
  constructor(
    private productsService: ProductsService,
  ) { }

  /**
   * ngOnInit
   * @returns void
   */
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  /**
   * getCategories
   * @description fuction to get all categories
   * @returns {void} void
   */
  public getCategories() {
    this.productsCategSub$.add(
      this.productsService.getCategories().subscribe((categories: string[]) => {
        this.catagories = ['All', ...categories];
      })
    )
  }

  /**
   * getProducts
   * @description fuction to get all products
   * @returns {void} void
   */
  public getProducts(): void {
    this.isLoading = true
    this.productsCategSub$.add(
      this.productsService.getProducts().subscribe((products: Product[]) => {
        this.isLoading = false;
        this.allProducts = products;
        this.selecteProducts = products;
      })
    );

  }
  /**
   * categoriesFiltered
   * @description fuction to filter  products with categories
   * @returns {void} void
   * @param event 
   */
  public categoriesFiltered(event: any) {
    if (event.index != 0) {
      const filterText = event.tab.textLabel;
      this.selecteProducts = this.allProducts.filter((product: Product) => {
        return product.category.toUpperCase() === filterText;
      });
    } else {
      this.selecteProducts = this.allProducts;
    }
  }

  ngOnDestroy(): void {
    this.productsCategSub$.unsubscribe();
  }


}
