import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  isClose = false;
  close() {
    this.isClose = !this.isClose;
  }
  userDetail !: FormGroup;
  userObj: any = {};
  userList: any[] = [];
  RoleList: any[] = [];


  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllRole()
    this.getAllUser()
    this.userDetail = this.formBuilder.group({
      idUser: [''],
      firstName: [''],
      lastName: [''],
      mail: [''],
      telNum: [''],
      password: [''],
      login: [''],
      idRole: [],
    });
  }

  addUser() {
    console.log(this.userDetail);
    console.log(this.RoleList.filter(e => e.idRole == this.userDetail.value.idRole)[0]);
    this.userObj.idUser = this.userDetail.value.idUser;
    this.userObj.firstName = this.userDetail.value.firstName;
    this.userObj.lastName = this.userDetail.value.lastName;
    this.userObj.telNum = this.userDetail.value.telNum;
    this.userObj.password = this.userDetail.value.password;
    this.userObj.login = this.userDetail.value.login;
    this.userObj.mail = this.userDetail.value.mail;
    this.userObj.role = this.RoleList.filter(e => e.idRole == this.userDetail.value.idRole)[0];

    this.userService.addUser(this.userObj).subscribe(res => {
      console.log(res);
      this.getAllUser();
    }, err => {
      console.log("error while fetching data");
    });

  }


  getAllUser() {
    this.userService.getAllUser().subscribe(res => {
      this.userList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }
  getAllRole() {
    this.userService.getAllRole().subscribe(res => {
      this.RoleList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }

  editUser(user: any) {
    console.log(user)
    this.userDetail.controls['idUser'].setValue(user.idUser);
    this.userDetail.controls['firstName'].setValue(user.firstName);
    this.userDetail.controls['lastName'].setValue(user.lastName);
    this.userDetail.controls['mail'].setValue(user.mail);
    this.userDetail.controls['login'].setValue(user.login);
    this.userDetail.controls['password'].setValue(user.password);
    this.userDetail.controls['telNum'].setValue(user.telNum);
    this.userDetail.controls['idRole'].setValue(user.idRole);
  }


  updateUser() {
    console.log(this.userObj)
    this.userObj.idUser = this.userDetail.value.idUser;
    this.userObj.firstName = this.userDetail.value.firstName;
    this.userObj.lastName = this.userDetail.value.lastName;
    this.userObj.telNum = this.userDetail.value.telNum;
    this.userObj.password = this.userDetail.value.password;
    this.userObj.login = this.userDetail.value.login;
    this.userObj.mail = this.userDetail.value.mail;
    this.userObj.role = this.RoleList.filter(e => e.idRole == this.userDetail.value.idRole)[0];

    this.userService.updateUser(this.userObj).subscribe(res => {
      console.log(res);

      this.getAllUser();

    }, err => {
      console.log(err);
    })

  }

  deleteUser(user: any) {
    console.log(user)
    this.userService.deleteUser(user.idUser).subscribe(res => {
      console.log(res);
      alert('user deleted successfully');
      this.getAllUser();
    }, err => {
      console.log(err);
    });

  }

  init() {
    this.userDetail = this.formBuilder.group({
      idUser: [''],
      firstName: [''],
      lastName: [''],
      mail: [''],
      telNum: [''],
      password: [''],
      login: [''],
      idRole: [''],
    });
  }

  getRole(idUser: any) {
    let roleType = "";
    console.log(idUser)
    this.RoleList.forEach(e => {
      if (e.user.findIndex((a: any) => a.idUser == idUser) >= 0) {
        roleType = e.roleType

      }
    })
    return (roleType)
  }

}
