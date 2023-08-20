import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/_models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ConfirmDialoge } from '../confirm-dialog/confirm-dialog.component';
import { ProductDyamicDialogComponent } from '../product-dyamic-dialog/product-dyamic-dialog.component';
import { DISPLYED_COLUMNS } from 'src/app/config/defines';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  /** displayedColumns */
  public displayedColumns = DISPLYED_COLUMNS;
  /** dataSource */
  public dataSource = new MatTableDataSource<Product>();
  /** isLoading */
  public isLoading = false;
  /** productsSub */
  productsSub$: Subscription = new Subscription();

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  /**
   * constructor
   * @param {ProductsService} productsService
   * @param {MatDialog} dialog 
   * @param {UiService} uiService
   */
  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private uiService: UiService,
  ) { }

  /** ngOnInit */
  ngOnInit(): void {
    this.getProducts()
  }

  /** ngAfterViewInit */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * getProducts
   * @description fuction to get all products
   * @returns {void} void
   */
  public getProducts(): void {
    this.isLoading = true
    this.productsSub$.add(
      this.productsService.getProducts().subscribe((products: Product[]) => {
        this.isLoading = false;
        this.dataSource.data = products;
      })
    );

  }

  /**
   * onDeleteProduct
   * @param id 
   * @description fuction to delete product after openning dialog
   * @returns {void} void
   */
  public onDeleteProduct(id: number): void {
    // open dialog to confirm deleting
    const dialogRef = this.dialog.open(ConfirmDialoge);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.removeProduct(id);
      }
    })
  }

  /**
   * removeProduct
   * @description function to remove product with selected id
   * @param {number} id
   * @returns void
   */
  public removeProduct(id: number): void {
    this.isLoading = true;
    this.productsSub$.add(
      this.productsService.deleteProduct(id).subscribe(() => {
        this.isLoading = false;
        this.uiService.showSnackBar('product removed successfully!', null, 3000, 'top')
        this.dataSource.data = this.dataSource.data.filter(product => {
          return product.id !== id
        })
      })
    )
  }

  /**
   * openDynamicDialog
   * @description fuction to open dynamic form dialog to handle add and update products
   * @param mode 
   * @param data 
   */
  public openDynamicDialog(mode: string, data?: Product): void {
    const dialogRef = this.dialog.open(ProductDyamicDialogComponent, {
      data: { mode, product: { ...data } }
    });
    dialogRef.afterClosed().subscribe((product) => {
      if (!product) return;

      product && product.mode === 'Update' ? this.updateProduct(data?.id, product.product) : this.addProduct(product.product);
    })
  }
  /**
   * updateProduct
   * @description fuction to update product
   * @param id 
   * @param product 
   */
  public updateProduct(id: any, product: Product): void {
    this.isLoading = true;

    this.productsSub$.add(
      this.productsService.updateProduct(id, product).subscribe((updatedProduct) => {
        this.isLoading = false;
        this.uiService.showSnackBar('product updated successfully!', null, 3000, 'top')
        this.dataSource.data = this.dataSource.data.filter((value) => {
          if (value.id == id) {
            value.title = updatedProduct.title;
            value.category = updatedProduct.category;
            value.price = updatedProduct.price;
            value.image = updatedProduct.image;
          }
          return true;
        });
      })
    )
  }

  /**
   * addProduct
   * @description fuction to add product
   * @param product 
   */
  public addProduct(product: Product): void {
    this.isLoading = true;
    this.productsSub$.add(
      this.productsService.addProduct(product).subscribe((product) => {
        this.uiService.showSnackBar(' A new product created successfully!', null, 3000, 'top')
        this.isLoading = false;
        this.dataSource.data = [product, ...this.dataSource.data];
      })
    )
  }
  ngOnDestroy(): void {
    this.productsSub$.unsubscribe();
  }
}
