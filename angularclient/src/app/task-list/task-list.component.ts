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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.fetchAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
}
