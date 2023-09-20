import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass'],
})
export class TaskFormComponent {
  taskForm: FormGroup;
  constructor(
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [''],
      status: [''],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      formData.deadline = this.datePipe.transform(
        formData.deadline,
        'yyyy-MM-ddTHH:mm:ss'
      );
      this.taskService.saveTask(formData).subscribe(() => this.goToTaskList());
    }
  }

  goToTaskList() {
    this.router.navigate(['/tasks']);
  }
}
