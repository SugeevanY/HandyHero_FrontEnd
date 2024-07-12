import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {UsersService} from "../../../Services/Admin/users.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  customers:any[] = [];

  constructor(private users:UsersService) {
  }

  ngOnInit() {
  this.loadUsers()
  }

  loadUsers(){
    this.users.getUsers().subscribe(
      (data: any) => {
        this.customers = data.body
        console.log(this.customers)
      },
      (error) => {
        console.error("error while get customers : ", error)
      }
    )
  }
}
