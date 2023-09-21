import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskService } from '../task/task.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task/task';

@Component({
  selector: 'app-edit-task-form-dialog',
  templateUrl: './edit-task-form-dialog.component.html',
  styleUrls: ['./edit-task-form-dialog.component.sass'],
})
export class EditTaskFormDialogComponent {
  editTaskForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskToUpdate: Task },
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<EditTaskFormDialogComponent>
  ) {
    this.editTaskForm = this.formBuilder.group({
      id: [this.data.taskToUpdate.id],
      title: [
        this.data.taskToUpdate.title || '',
        [Validators.required, Validators.maxLength(60)],
      ],
      description: [
        this.data.taskToUpdate.description || '',
        Validators.maxLength(255),
      ],
      deadline: [
        this.data.taskToUpdate.deadline || '',
        [Validators.required, this.futureDateValidator],
      ],
      status: [this.data.taskToUpdate.status || ''],
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
    if (this.editTaskForm.valid) {
      const formData = this.editTaskForm.value;
      formData.deadline = this.datePipe.transform(
        formData.deadline,
        'yyyy-MM-ddTHH:mm:ss'
      );
      this.taskService.updateTask(formData).subscribe(() => {
        this.returnToMainPage();
      });
    }
  }

  returnToMainPage(): void {
    this.taskService.fetchAllTasks();
    this.dialogRef.close();
  }
}
