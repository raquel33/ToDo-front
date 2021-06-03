import { Component, OnInit} from "@angular/core";
import { ITask } from "../shared/interfaces/task.interface";
import { TasksService } from "./tasks.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.page.html",
  styleUrls: ["./tasks.page.scss"],
})
export class TasksPage implements OnInit{
  totalTasks: ITask[];

  constructor(private tasksService: TasksService){}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks(){
    this.tasksService
        .getTasks()
        .subscribe((res) => {
          if(res){
            console.log(res);
            this.totalTasks=res;
          }
        });
  }

}
