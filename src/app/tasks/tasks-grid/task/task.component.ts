import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TasksService } from '../../tasks.service';
import { NotificationDialogsService } from 'src/app/shared/services/notificationDialogs.service';
import { ISnackBarData } from 'src/app/shared/interfaces/snackbar.interface';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TaskInfoComponent } from '../task-info/task-info.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() taskInfo;
  @Output() changeInTasks = new EventEmitter< {name:string}> ();

  constructor(
    public dialog: MatDialog,
    private notificationsService : NotificationDialogsService,
    private tasksService: TasksService,
    private snackBar: MatSnackBar) 
    { }

  ngOnInit(): void {
  }

  emitEventTaskDeleted(){
    this.changeInTasks.emit({name:'A task was deleted'});
  }

  emitEventTaskEdited(){
    this.changeInTasks.emit({name:'A task was edited'});
  }

  editTask(taskInfo:ITask){
    if(taskInfo){
      const dialogRef = this.dialog.open(TaskInfoComponent, {
        panelClass: "dialog",
        data: {task: taskInfo, title: "Task Info" },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.emitEventTaskEdited();
      });
    }
  }


  deteleTask(taskInfo:ITask){
    if(taskInfo){
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        data: {
          name: taskInfo.name,
          btnPress: false,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        /**
         * if result btnPress is true, yes is pressed
         * remove the user
         */
        if (result) {
          // check if click out or cancel
          if (result.btnPress) {
            // check if press yes
            this.tasksService
                .deleteTask(taskInfo._id)
                .subscribe((res) => {
                  if(res){
                    this.emitEventTaskDeleted();
                    const notificationData: ISnackBarData = {
                      message: "The task was deleted successfully",
                      panelClass: ["toast-success"],
                    }; 
                    this.notificationsService.notification$.next(notificationData);
                  }else{
                    const notificationData: ISnackBarData = {
                      message: "The task could not be deleted due to an error, please try again",
                      panelClass: ["toast-danger"],
                    };
                    this.notificationsService.notification$.next(notificationData);
                  }
                });
          }
        }
      });
    }
  }

}
