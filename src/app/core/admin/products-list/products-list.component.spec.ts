import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { Product } from '../../../shared/_models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';

import { ProductsListComponent } from './products-list.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { UiService } from 'src/app/shared/services/ui.service';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsServiceMock: any;
  let matDialogMock: any;
  let mockProductData: Product[];
  let matDialogRefMock: MatDialogRef<any>;
  let uiServiceMock: any;

  beforeEach(async () => {
    productsServiceMock = jasmine.createSpyObj('ProductsService', [
      'getProducts',
      'updateProduct',
      'deleteProduct',
      'addProduct',
    ]);

    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogMock.open.and.returnValue(matDialogRefMock);
    uiServiceMock = jasmine.createSpyObj('uiService', [
      'showSnackBar'
    ])

    const mockPaginator = jasmine.createSpyObj('MatPaginatorIntl', [
      'getRangeLabel',
    ]);
    mockPaginator.getRangeLabel.and.returnValue('1 - 10 of 100');

    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [
        TranslateModule.forRoot(), // add TranslateModule to imports
        MatIconModule,
        MatPaginatorModule,
        MatTableModule
      ],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MatPaginator, useValue: mockPaginator }, // provide mock paginator intl
        { provide: UiService, useValue: uiServiceMock },

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    mockProductData = [
      {
        id: 1,
        title: 'Product 1',
        category: 'Category A',
        price: 10,
        description: 'Description 1',
        image: 'image-1.jpg',
      },
      {
        id: 2,
        title: 'Product 2',
        category: 'Category B',
        price: 20,
        description: 'Description 2',
        image: 'image-2.jpg',
      },
      {
        id: 3,
        title: 'Product 3',
        category: 'Category C',
        price: 30,
        description: 'Description 3',
        image: 'image-3.jpg',
      },
    ];
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get products successfully', () => {
    const getProductsSpy =
      productsServiceMock.getProducts.and.returnValue(of(mockProductData));
    component.ngOnInit();
    expect(getProductsSpy).toHaveBeenCalled();
  });

  it('should delete a product', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteProductSpy = productsServiceMock.deleteProduct.and.returnValue(
      of({})
    );
    component.removeProduct(mockProductData[0].id);
    expect(deleteProductSpy).toHaveBeenCalledWith(mockProductData[0].id);
  });

  it('should edit a product', () => {
    const updateProductSpy = productsServiceMock.updateProduct.and.returnValue(
      of({})
    );
    component.updateProduct(1, mockProductData[0]);
    expect(updateProductSpy).toHaveBeenCalledWith(1, mockProductData[0]);
  });

  it('should apply table data', () => {
    const mockDataSource = new MatTableDataSource(mockProductData);

    component.dataSource = mockDataSource;

    expect(component.dataSource.data).toEqual(mockProductData);
  });
});
