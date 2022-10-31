import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //apiUrl:string="https://api.limantech.com/todo/"
  //artık apiUrl app-module.ts => providers den geliyor
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) {}

  addTodo(obj: any) {
    let newPAth: string = this.apiUrl + 'todo';
    return this.httpClient.post(newPAth, obj);
  }

  getAllTodos() {
    let newPAth: string = this.apiUrl + 'todo';
    return this.httpClient.get(newPAth);
  }

  updateTodo(obj: any) {
    let newPAth: string = this.apiUrl + 'todo';
    return this.httpClient.put(newPAth, obj);
  }

  deleteTodo(id: any) {
    let newPAth: string = this.apiUrl + 'todo/' + id;
    return this.httpClient.delete(newPAth);
  }
}
