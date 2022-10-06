import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user";
import {RoleService} from "../../service/role.service";
import {Role} from "../../models/role";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User;
  roles: Role[];


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserBiId(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));

    this.getRoles();


  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      this.goToUserList();
    }, error => console.log(error));
  }

  goToUserList(){
    void this.router.navigate(['/admin']);
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

  private getRoles(){
    this.roleService.getRolesList().subscribe(data => {
      this.roles = data;
    })
  }

  public objectComparisonFunction ( option: any, value: any ) : boolean {
    return option.id === value.id;
  }

}
