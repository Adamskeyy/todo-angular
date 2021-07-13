import { Component } from '@angular/core';
import { UsersApi } from './users.api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  allUsers$ = this.usersApi.getAllUsers();

  constructor(private usersApi: UsersApi) {}
}
