import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task/task.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.sass'],
})
export class TaskFormDialogComponent {
  taskForm: FormGroup;
  constructor(
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<TaskFormDialogComponent>
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [''],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      formData.deadline = this.datePipe.transform(
        formData.deadline,
        'yyyy-MM-ddTHH:mm:ss'
      );
      this.taskService.saveTask(formData).subscribe(() => {
        this.returnToMainPage();
      });
    }
  }

  returnToMainPage() {
    this.taskService.fetchAllTasks();
    this.dialogRef.close();
  }
}
