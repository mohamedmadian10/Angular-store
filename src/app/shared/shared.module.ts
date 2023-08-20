import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button"
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    TranslateModule
  ]
})
export class SharedModule { }