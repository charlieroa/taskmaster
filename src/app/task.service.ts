import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itask } from './interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Itask[]> {
    return this.http.get<Itask[]>(`${this.apiUrl}/tasks`);
  }

  getInProgress(): Observable<Itask[]> {
    return this.http.get<Itask[]>(`${this.apiUrl}/inProgress`);
  }

  getCompleted(): Observable<Itask[]> {
    return this.http.get<Itask[]>(`${this.apiUrl}/completed`);
  }

  getTaskById(id: number): Observable<Itask> {
    return this.http.get<Itask>(`${this.apiUrl}/tasks/${id}`);
  }

  updateTask(task: Itask): Observable<Itask> {
    return this.http.put<Itask>(`${this.apiUrl}/tasks/${task.id}`, task);
  }

  addTask(task: Itask): Observable<Itask> {
    return this.http.post<Itask>(`${this.apiUrl}/tasks`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  deleteInProgressTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inProgress/${id}`);
  }

  deleteCompletedTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/completed/${id}`);
  }

  updateTaskOrder(task: Itask[]): Observable<Itask[]> {
    // Envía la lista actualizada de tareas al servidor
    return this.http.put<Itask[]>(`${this.apiUrl}/updateTaskOrder`, task);
  }


}
