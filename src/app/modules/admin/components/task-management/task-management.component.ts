import { Component, OnInit } from '@angular/core';
import {Tasks} from "../../../../model/tasks";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {TaskService} from "../../../../services/task.service";

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent implements OnInit {
  taskList: Tasks[] = [];
  taskDetails !: FormGroup;
  status = 'select status';
  userList: any;
  allUsers: any;
  taskObj: Tasks;
  taskId: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private taskservice: TaskService) {
  }

  ngOnInit(): void {
    this.taskObj = new Tasks();
    this.getAllTasks();
    this.taskDetails = this.formBuilder.group({
      idTask: [''],
      description: [''],
      statustype: [''],
      storypoint:[''],
      startDate: [''],
      endDate: [''],
      timeSpent: ['']
    });

  }

  init() {
    this.taskDetails = this.formBuilder.group({
      description: [''],
      statustype: [''],
      storypoint:['']
    });
  }

  affect(idTask: number) {
    this.taskId = idTask;
    this.getAllUsers();
  }

  editTask(idTask: number) {
    const task = this.taskList.filter(t => t.idTask === idTask)[0];
    // this.taskDetails.controls['id'].setValue(idTask);
    this.taskDetails.controls['description'].setValue(task.description);
    this.taskDetails.controls['statustype'].setValue(task.statustype);
    this.taskDetails.controls['storypoint'].setValue(task.storypoint);
    this.taskId = idTask;
  }

  delete(idTask: number) {
    this.taskservice.deleteTask(idTask).subscribe({
      next: value => {
        alert('user deleted successfully');
        this.getAllTasks();
      }, error: err => console.log(err)
    })
  }

  selectStatus(status: string) {
    this.status = status;
  }

  addTask() {
    this.taskObj.description = this.taskDetails.value.description;
    this.taskObj.statustype = this.status;
    this.taskObj.storypoint = this.taskDetails.value.storypoint;

    this.taskservice.add(this.taskObj).subscribe(res => {
      this.getAllTasks();
    }, err => {
      console.log("error while fetching data");
    });

  }

  updateTask() {
    this.taskObj.description = this.taskDetails.value.description;
    this.taskObj.statustype = this.status;
    this.taskObj.storypoint = this.taskDetails.value.storypoint;
    this.taskObj.idTask = this.taskId;

    this.taskservice.update(this.taskObj).subscribe(res => {
      this.getAllTasks();
    }, err => {
      console.log("error while fetching data");
    });
  }

  affectUser(user: any) {
    this.taskservice.affectToUser(user, this.taskId).subscribe({
      next: value => this.getAllTasks(), error: err => console.log(err)});
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe({next: value => this.allUsers = value, error: err => console.log(err)})
  }

  selectUser(us: any) {

  }

  deleteUser(user: any) {

  }

  private getAllTasks() {
    this.taskservice.findAll().subscribe({
      next: (value: Tasks[]) => {
        this.taskList = value;
      }, error: err => console.log(err)
    })
  }
}
