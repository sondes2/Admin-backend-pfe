import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Groupe } from 'src/app/model/groupe';
import { User } from 'src/app/model/user';
import {UserService} from "../../../../service/user.service";
import {GroupeService} from "../../../../services/groupe.service";

@Component({
  selector: 'app-goupe-management',
  templateUrl: './goupe-management.component.html',
  styleUrls: ['./goupe-management.component.scss']
})
export class GoupeManagementComponent implements OnInit {

  groupList: Groupe[] = [];
  groupDetail !: FormGroup;
  groupObj: Groupe;
  userList: User[] = [];
  allUsers: User[] = [];
  groupId: number = 0;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private groupeService: GroupeService) { }

  ngOnInit(): void {
    this.groupObj = new Groupe();

    this.getAllGroups()
    this.groupDetail = this.formBuilder.group({
      id:[''],
      name: ['']
    });
  }

  delete(id: number) {
    this.groupeService.deleteGroupe(id).subscribe({
      next: value => {
        alert('user deleted successfully');
        this.getAllGroups();
      }, error: err => console.log(err)
    })
  }

  addGroup() {
    this.groupObj.name = this.groupDetail.value.name;
    this.groupeService.addGroupe(this.groupObj).subscribe(res => {
      this.getAllGroups();
    }, err => {
      console.log("error while fetching data");
    });
  }

  editGroup(group: Groupe) {
    this.groupDetail.controls['id'].setValue(group.id);
    this.groupDetail.controls['name'].setValue(group.name);
  }

  getAllGroups() {
    this.groupeService.findAll().subscribe((res: Groupe[]) => {
      this.groupList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }


  updateGroup() {
    console.log(this.groupObj);
    this.groupObj.id = this.groupDetail.value.id;
    this.groupObj.name = this.groupDetail.value.name;
    console.log(this.groupObj);
    this.groupeService.updateGroupe(this.groupObj).subscribe(res => {
      console.log(res);
      this.getAllGroups();
    }, err => {
      console.log(err);
    })

  }

  init() {
    this.groupDetail = this.formBuilder.group({
      id: [''],
      name: [''],
    });
  }

  manageUsers(idGroup: number) {
    this.groupId = idGroup;
    this.getUserByGroup(idGroup);
  }

  getUserByGroup(idGroup: number) {
    this.userService.getUsersByGroup(idGroup).subscribe(res => {
      this.userList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }

  editUser(groupId: number, user: User) {
    const groupe = this.groupList.filter(g => g.id === groupId)[0];
    console.log(groupe);
    this.userService.affectGroup(groupe, user.idUser).subscribe({next: value => {
        this.getUserByGroup(groupId);
      }, error: err => console.log(err)});
  }

  deleteUser(user: User) {
    this.userService.deleteUserFromGroup(user.idUser).subscribe({next: value => {
        this.getUserByGroup(this.groupId);
      }, error: err => console.log(err)});
  }

  addUser() {
    this.userList.push(new User());
    console.log(this.userList);
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: value => {
        this.allUsers = value;
      }, error: err => console.log(err)
    })
  }

  selectUser(user: User) {
    this.userList[this.userList.length - 1] = user;
    const group = this.groupList.filter(gr => gr.id === this.groupId)[0];
    this.userService.affectGroup(group, user.idUser).subscribe({next: value => {
      console.log(value)
      }, error: err => console.log(err)});
  }
}
