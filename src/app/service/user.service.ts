import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import {Groupe} from "../model/groupe";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  optionRequete = { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*' }) };
  addUserURL: string;
  getUserURL: string;
  affectGroupURL: string;
  getUserByGroupURL: string;
  updateUserUrl: string;
  deleteUserUrl: string;
  RoleUrl: string;
  private deleteUserFromGroupURL: string;

  constructor(private http: HttpClient) {

    this.addUserURL = 'http://localhost:8085/User/AddUser';
    this.affectGroupURL = 'http://localhost:8085/User/affectGroup/';
    this.deleteUserFromGroupURL = 'http://localhost:8085/User/deleteGroup/';
    this.getUserURL = 'http://localhost:8085/User/findall';
    this.getUserByGroupURL = 'http://localhost:8085/User/findByGroupe/';
    this.updateUserUrl = 'http://localhost:8085/User/UpdateUser';
    this.deleteUserUrl = 'http://localhost:8085/User/deleteUserById';
    this.RoleUrl = 'http://localhost:8085/Role/findall';

  }

  addUser(user: any): Observable<any> {
    return this.http.post<User>(this.addUserURL, user);
  }

  affectGroup(groupe: Groupe, userID: number) {
    console.log(groupe);
    return this.http.put(this.affectGroupURL + userID, groupe);
  }

  deleteUserFromGroup(userID: number) {
    return this.http.put(this.deleteUserFromGroupURL + userID, null);
  }

  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(this.getUserURL);
  }

  getUsersByGroup(idUser: number): Observable<any[]> {
    return this.http.get<any[]>(this.getUserByGroupURL + idUser);
  }
  getAllRole(): Observable<any[]> {
    return this.http.get<any[]>(this.RoleUrl);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(this.updateUserUrl, user);
  }

  deleteUser(idUser: any): Observable<any> {
    return this.http.delete<any>(this.deleteUserUrl + '/' + idUser);
  }


}
