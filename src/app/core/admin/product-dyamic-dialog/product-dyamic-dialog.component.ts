import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/_models/product.model';

@Component({
  selector: 'app-product-dyamic-dialog',
  templateUrl: './product-dyamic-dialog.component.html',
  styleUrls: ['./product-dyamic-dialog.component.scss']
})
export class ProductDyamicDialogComponent implements OnInit {
  
  /** producDynamictForm */
  public producDynamictForm!: FormGroup;
  
  /**
   * constructor
   * @param {FormBuilder} formBuilder 
   * @param {MAT_DIALOG_DATA} passedData 
   */
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public passedData: any
  ) { }
  
  /** ngOnInit */
  ngOnInit(): void {
    this.initDynamicForm();

    if (this.passedData.mode === 'edit') {
      this.producDynamictForm.setValue({
        title: this.passedData.product.title,
        price: this.passedData.product.price,
        category: this.passedData.product.category,
        image: this.passedData.product.image,
      })
    } 
  }

  /**
   * initDynamicForm
   * @description function to initialize form
   * @returns void
   */
  public initDynamicForm(): void {
      this.producDynamictForm = this.formBuilder.group({
        title: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        image: ['', Validators.required],
      })    
  }
}
