import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { MaterialModule } from '../material.module';
import { TasksPage } from './tasks.page';
import { NewTaskComponent } from './new-task/new-task.component';
import { FormsModule } from '@angular/forms';
import { TasksGridComponent } from './tasks-grid/tasks-grid.component';
import { TaskComponent } from './tasks-grid/task/task.component';
import { TaskInfoDialogModule } from './tasks-grid/task-info/task-info.module';


@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    MaterialModule,
    TaskInfoDialogModule
  ],
  declarations: [TasksPage, NewTaskComponent, TasksGridComponent, TaskComponent],
})
export class TasksModule { }
