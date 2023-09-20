import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly taskBaseUrl: string;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.taskBaseUrl = 'http://localhost:8080/api/task';
    this.http = http;
  }

  public fetchAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskBaseUrl);
  }

  public saveTask(task: Task) {
    return this.http.post<Task>(this.taskBaseUrl, task);
  }
}
