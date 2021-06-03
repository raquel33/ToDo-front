import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, mapTo } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ITask } from "../shared/interfaces/task.interface";


@Injectable({
  providedIn: "root",
})
export class TasksService {
  baseUrl = environment.urlServices;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.baseUrl}/tasks`);
  }

  createTask(task: ITask): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/tasks`, task).pipe(
      mapTo(true),
      catchError((error) => {
        console.log('create task error captured');
        return of(false);
      })
    );
  }

  updateTask(id: string, task: ITask): Observable<boolean> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task).pipe(
      mapTo(true),
      catchError((error) => {
        console.log('update task error captured');
        return of(false);
      })
    );
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`);
  }
  
}
