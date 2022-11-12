import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {
    path:"" , component : HomePageComponent,  
  },
  {
    path:"edituser",  component : UserUpdateComponent,
    canActivate:[RoleGuard]
  },
  {
    path:"login", component : UserLoginComponent,
  },
  {
    path:"register", component : UserRegisterComponent,
  },
  {
    path:"newscreate", component : NewsCreateComponent,
    canActivate:[RoleGuard]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
