import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users!: Users[];
  searchText: string = '';
  error: string = '';

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
    .subscribe((response: Users[]) => {
      this.users = response;
    } )
  }

}
export { Users };

