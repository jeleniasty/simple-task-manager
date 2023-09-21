import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task/task.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Status } from '../task/status';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.sass'],
})
export class TaskFormDialogComponent {
  taskForm: FormGroup;
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<TaskFormDialogComponent>
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', Validators.maxLength(255)],
      deadline: ['', [Validators.required, this.futureDateValidator]],
    });
  }

  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      return { futureDate: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;

      formData.deadline = this.datePipe.transform(
        formData.deadline,
        'yyyy-MM-ddTHH:mm:ss'
      );
      formData.status = Status.TODO;

      this.taskService.saveTask(formData).subscribe(() => {
        this.returnToMainPage();
      });
    }
  }

  returnToMainPage(): void {
    this.taskService.fetchAllTasks();
    this.dialogRef.close();
  }
}
