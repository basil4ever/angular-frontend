import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";
import { UpdateUserComponent } from './update-user/update-user.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    UpdateUserComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatInputModule
    ]
})
export class AuthModule { }
