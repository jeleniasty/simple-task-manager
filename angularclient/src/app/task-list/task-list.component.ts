import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
import { TaskDetailsDialogComponent } from '../task-details-dialog/task-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Status } from '../task/status';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  protected readonly Status = Status;
  tasks: Task[] = [];
  rowCount: number = 0;
  sortedColumn: string | null = 'deadline';
  isAscending: boolean = true;

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
  sortTable(column: string) {
    if (this.sortedColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }

    this.tasks.sort((a: Task, b: Task) => {
      const aValue = a[this.sortedColumn as keyof Task];
      const bValue = b[this.sortedColumn as keyof Task];

      if (!aValue) {
        return this.isAscending ? -1 : 1;
      }

      if (!bValue) {
        return this.isAscending ? 1 : -1;
      }

      if (aValue < bValue) return this.isAscending ? -1 : 1;
      if (aValue > bValue) return this.isAscending ? 1 : -1;
      return 0;
    });
  }

  updateTaskStatus(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      this.taskService.fetchAllTasks();
    });
  }
}
