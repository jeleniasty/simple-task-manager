import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Task } from '../task/task';
import { EditTaskFormDialogComponent } from '../edit-task-form-dialog/edit-task-form-dialog.component';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.sass'],
})
export class TaskDetailsDialogComponent implements OnInit {
  task?: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taskService
      .getTask(this.data.taskId)
      .subscribe((data) => (this.task = data));
  }

  returnToMainPage() {
    this.taskService.fetchAllTasks();
    this.dialogRef.close();
  }

  openEditTaskFormDialog() {
    if (this.task) {
      this.dialog.open(EditTaskFormDialogComponent, {
        data: {
          taskToUpdate: this.task,
        },
      });
      this.dialogRef.close();
    }
  }

  removeTask(taskId: number | undefined): void {
    if (taskId) {
      this.taskService
        .removeTask(taskId)
        .subscribe(() => this.returnToMainPage());
    }
  }
}
