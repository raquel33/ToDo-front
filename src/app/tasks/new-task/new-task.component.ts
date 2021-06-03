import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBarData } from 'src/app/shared/interfaces/snackbar.interface';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { NotificationDialogsService } from 'src/app/shared/services/notificationDialogs.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  @Output() newTaskCreated = new EventEmitter< {}> ();
  loading: boolean = false;
  name;
  description;
  priority;

  constructor(
    private notificationsService : NotificationDialogsService,
    private tasksService: TasksService,
    private snackBar: MatSnackBar
    ) { 
    this.notificationsService.notification$.subscribe((data: ISnackBarData) => {
      this.snackBar.open(data.message, data.action, {
        duration: data.duration || 2000,
        panelClass: data.panelClass,
        verticalPosition: data.verticalPosition ? data.verticalPosition : "top",
      });
    });
  }

  ngOnInit(): void {}

  clearForm(){
    this.name = undefined;
    this.description= undefined;
    this.priority= undefined;
  }

  emitEventNewTaskCreated(){
    this.newTaskCreated.emit();
  }
    
  onChange(mrChange: MatRadioChange){
    this.priority=mrChange.value;
  }

  save(task: ITask){
    this.loading = true;

    if(task){
      task.priority=this.priority;
      this.tasksService
          .createTask(task)
          .subscribe((res) => {
            this.loading = false;
            if(res){
              this.clearForm();
              this.emitEventNewTaskCreated();
              const notificationData: ISnackBarData = {
                message: "The task was created successfully",
                panelClass: ["toast-success"],
              }; 
              this.notificationsService.notification$.next(notificationData);
            }else{
              const notificationData: ISnackBarData = {
                message: "The task could not be created due to an error, please try again",
                panelClass: ["toast-danger"],
              };
              this.notificationsService.notification$.next(notificationData);
            }
          });
    }
  }

  
}
