import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Groupe } from '../model/groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  url = environment.serverURL + 'Group';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.url + '/findall');
  }

  addGroupe(groupe: Groupe) {
    return this.http.post(this.url + '/AddGroup', groupe);
  }

  updateGroupe(groupe: Groupe){
    return this.http.put(this.url+ '/UpdateGroup', groupe)
  }

  deleteGroupe(id: number) {
    return this.http.delete(this.url + '/deleteGroupById/' + id);
  }
}
