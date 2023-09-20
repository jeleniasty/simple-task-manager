import { Component } from '@angular/core';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title: string;

  constructor(private dialog: MatDialog) {
    this.title = 'Simple Task Manager';
  }

  openTaskFormDialog() {
    this.dialog.open(TaskFormDialogComponent);
  }
}
