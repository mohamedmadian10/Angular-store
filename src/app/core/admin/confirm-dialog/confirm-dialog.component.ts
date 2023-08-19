import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    template: `
    <div class="confirm-dialog-wrapper">
        <h2>{{"ADMIN.DELETE_CONFIRMATION" | translate}}</h2>
        <div class="actions">
            <button  mat-raised-button color="warn" [mat-dialog-close]="true">{{"ADMIN.CONFIRM" | translate}}</button>
            <button mat-raised-button type="button"  [mat-dialog-close]="false">{{"ADMIN.CANCEL" | translate}}</button>
        </div>
    </div>
    `,
    styleUrls: ['./confirm-dialog.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, TranslateModule],

})
export class ConfirmDialoge {
    /**
     * constructor
     * @param {MAT_DIALOG_DATA} passedData 
     */
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}