import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarData } from 'src/app/shared/interfaces/snackbar.interface';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { NotificationDialogsService } from 'src/app/shared/services/notificationDialogs.service';
import { TasksService } from '../../tasks.service';

interface IData {
  task: ITask;
  title: string;
}

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss']
})
export class TaskInfoComponent implements OnInit {
  name;
  description;
  priority;

  constructor(
    public dialogRef: MatDialogRef<TaskInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private notificationsService : NotificationDialogsService,
    private tasksService: TasksService,
    private snackBar: MatSnackBar
  ) {
    if (this.data.task) {
      this.name= this.data.task.name;
      this.description= this.data.task.description;
      this.priority= this.data.task.priority;
   }
  }

  ngOnInit(): void {
  }

  onChange(mrChange: MatRadioChange){
    this.priority=mrChange.value;
  }
  
  async save(task: ITask): Promise<void> {
    if (this.data.task) {
      task.priority=this.priority;
      try {
        this.tasksService
          .updateTask(this.data.task._id, task)
          .subscribe((res) => {
            console.log(res);
            if(res){
              this.dialogRef.close();
              const notificationData: ISnackBarData = {
                message: "The task was updated successfully",
                panelClass: ["toast-success"],
              };
              this.notificationsService.notification$.next(notificationData);
            }
          });
      } catch (err) {
        const notificationData: ISnackBarData = {
          message: err.message[0],
          panelClass: ["toast-danger"],
        };
        this.notificationsService.notification$.next(notificationData);
      }
    }
  }
}
