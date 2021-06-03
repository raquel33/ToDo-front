import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tasks-grid',
  templateUrl: './tasks-grid.component.html',
  styleUrls: ['./tasks-grid.component.scss']
})
export class TasksGridComponent implements OnInit {
  @Input() totalTasks;
  @Output() tasksChanged = new EventEmitter< {name:string}> ();

  constructor() { }

  ngOnInit(): void {}

  changeInTasks(event : {name: string}){
    this.tasksChanged.emit({name:event.name});
  }

}
