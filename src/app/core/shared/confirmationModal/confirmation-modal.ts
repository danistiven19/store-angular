import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from"@angular/material/dialog";


@Component({
    selector: 'store-confirmation-modal',
    templateUrl: 'confirmation-modal.html',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule
    ]
})
export class StoreConfirmationModal {}