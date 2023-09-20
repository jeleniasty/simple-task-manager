import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskBaseUrl: string;
  private http: HttpClient;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(http: HttpClient) {
    this.taskBaseUrl = 'http://localhost:8080/api/task';
    this.http = http;
  }

  public fetchAllTasks(): void {
    this.http
      .get<Task[]>(this.taskBaseUrl)
      .subscribe((data) => this.tasksSubject.next(data));
  }

  public saveTask(task: Task) {
    return this.http.post<Task>(this.taskBaseUrl, task);
  }
}
