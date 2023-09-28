import { Component } from '@angular/core';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string;

  constructor(private dialog: MatDialog) {
    this.title = 'Simple Task Manager';
  }

  openTaskFormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'custom-dialog-panel';
    this.dialog.open(TaskFormDialogComponent, dialogConfig);
  }
}
