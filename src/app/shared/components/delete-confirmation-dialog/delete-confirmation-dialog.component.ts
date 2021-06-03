import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IDialogData {
  name: string;
  btnPress: boolean;
}

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) 
    { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.data.btnPress = false;
    this.dialogRef.close();
  }
  
  onYesClick(): void {
    this.data.btnPress = true;
    this.dialogRef.close(this.data);
  }
}
