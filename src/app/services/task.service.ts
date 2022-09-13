import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Tasks} from "../model/tasks";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = environment.serverURL + 'Task';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.url + '/findalltask');
  }

  add(task: Tasks) {
    return this.http.post(this.url + '/AddTask', task);
  }

  update(task: Tasks) {
    console.log(task);
    return this.http.put(this.url + '/UpdateTask', task);
  }

  updateStatus(statusType: string, taskId: number) {
    return this.http.put(this.url + '/updateStatus/' + taskId + '/' + statusType, null);
  }

  affectToUser(user: User, taskId: number) {
    return this.http.put(this.url + '/affectUserToTask/' + taskId , user);
  }

  deleteUserFromTask(taskId: number) {
    return this.http.put(this.url + '/deleteUserFromTask/' + taskId , null);
  }
  deleteTask(idTask: number){
    return this.http.delete(this.url+'/deleteTaskById/'+idTask);

}


}
