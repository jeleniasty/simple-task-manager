import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormDialogComponent } from './task-form-dialog/task-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailsDialogComponent } from './task-details-dialog/task-details-dialog.component';
import { EditTaskFormDialogComponent } from './edit-task-form-dialog/edit-task-form-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormDialogComponent,
    TaskDetailsDialogComponent,
    EditTaskFormDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
