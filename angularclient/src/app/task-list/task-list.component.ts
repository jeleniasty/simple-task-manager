import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  rowCount: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.fetchAllTasks();
    this.taskService.tasks$.subscribe((data) => (this.tasks = data));
  }

  // openTaskDetailsDialog(id: number | undefined) {}
}
