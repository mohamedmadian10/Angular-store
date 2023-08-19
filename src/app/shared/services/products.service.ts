import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product.model';
import { environment } from '../../../environments/environment';

/** ProductsService */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  /** productsSubject */
  productsSubject = new BehaviorSubject<Product[] | null>(null);
  catagoriesSubject$ = new BehaviorSubject<string[] | null>(null);


  /**
   * constructor
   * @param {HttpClient} http 
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * getProducts
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * addProduct
   * @param {Product} product
   * @description function to add product 
   * @returns {Observable<Product>} 
   */
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  /**
   * updateProduct
   * @param {number} id 
   * @param {Product} product 
   * @returns { Observable<Product>}
   */
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }
  /**
   * deleteProduct
   * @description function to remove productt
   * @param {number} id 
   * @returns { Observable<Product>}
   */
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * getAllProducts
   * @description function to handle all products state later the same idea of userSubject in auth service
   * @param {Product} products 
   */
  getAllProducts(products: Product[]): Observable<Product[] | null> {
    return this.productsSubject.asObservable();
  }

  /**
   * getCategories
   *  @description function to get all Categories
   * @returns { Observable<string[]>}
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
}
