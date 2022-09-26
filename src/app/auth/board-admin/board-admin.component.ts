import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  content: string ='';
  // @ts-ignore
  currentAuthUser: User;

    // @ts-ignore
  users: User[];
  constructor(private userService: UserService,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.getUsers();

    this.currentAuthUser = this.tokenStorageService.getUser();
  }

  private getUsers(){
    this.userService.getUsersList().subscribe(data => {
      this.users = data;
      })
  }

  updateUser(id: number){
    this.router.navigate([`update-user`, id]);
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();
    })
  }

  getRoleName(dbName: string): any {
    switch (dbName) {
      case 'ROLE_MODERATOR': {
        return {text: 'Moderator', color: 'green'}
      }
      case 'ROLE_USER': {
        return {text: 'User', color: 'blue'}
      }
      case 'ROLE_ADMIN': {
        return {text: 'Admin', color: 'red'}
      }

      default: {
        return 'role'
      }
    }
  };



}
