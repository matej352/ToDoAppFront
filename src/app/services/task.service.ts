import { Injectable } from '@angular/core';

import {Task} from '../Task';

import {Observable, of} from 'rxjs';   //za asinkron rad (pozivi na backend)
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private restApiUrl = "https://localhost:44347/task";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.restApiUrl);
  }

  deleteTask(id: string): Observable<Task>{
    let url = `${this.restApiUrl}/${id}`;
    return this.http.delete<Task>(url);
  }

  createTask(obj: object):Observable<Task> {
    return this.http.post<Task>(this.restApiUrl, obj);
  }

  updateTask(task: Task): Observable<Task> {
    let url = `${this.restApiUrl}/${task.id}`;
    let obj = {
      id : task.id,
      markAsDone : task.markAsDone,
      title : task.title,
      text : task.text
    }
    return this.http.put<Task>(url, obj);

  }



}
