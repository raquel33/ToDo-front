import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [DeleteConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [DeleteConfirmationDialogComponent],
})
export class DeleteConfirmationDialogModule { }
