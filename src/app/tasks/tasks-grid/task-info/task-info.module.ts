import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TaskInfoComponent } from './task-info.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TaskInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [TaskInfoComponent],
})
export class TaskInfoDialogModule { }
