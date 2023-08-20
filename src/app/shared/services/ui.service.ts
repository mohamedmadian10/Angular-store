import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    loadingSpinner = new Subject<boolean>()
    /**
     * constructor
     * @param {MatSnackBar} snackBar 
     */
    constructor(private snackBar: MatSnackBar) { }
    /**
     * showSnackBar
     * @param message 
     * @param action 
     * @param duration 
     * @param verticalPosition 
     * @returns void
     */
    showSnackBar(message: string, action: any, duration: number, verticalPosition: MatSnackBarVerticalPosition): void {
        this.snackBar.open(message, action, {
            duration: duration,
            verticalPosition: verticalPosition
        })
    }

}
