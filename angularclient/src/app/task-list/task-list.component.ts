import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  rowCount: number = 0;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.fetchAllTasks();
    this.taskService.tasks$.subscribe((data) => (this.tasks = data));
  }

  openTaskDetailsDialog(taskId: number | undefined) {
    if (taskId != undefined) {
      this.dialog.open(TaskDetailsDialogComponent, {
        data: { taskId: taskId },
      });
    }
  }
}
