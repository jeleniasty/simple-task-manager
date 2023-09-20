import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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
      .subscribe((data: Task[]) => this.tasksSubject.next(data));
  }

  public saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskBaseUrl, task);
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.taskBaseUrl}/${taskId}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.taskBaseUrl, task);
  }

  removeTask(taskId: number): Observable<Task> {
    return this.http.delete<Task>(`${this.taskBaseUrl}/${taskId}`);
  }
}
