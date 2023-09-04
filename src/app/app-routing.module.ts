import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LineLoginComponent } from './line-login/line-login.component';
import { FineBandComponent } from './fine-band/fine-band.component';
import { ContactBandComponent } from './contact-band/contact-band.component';
import { NotificationComponent } from './notification/notification.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { BandPageComponent } from './band-page/band-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserPerformComponent } from './user-perform/user-perform.component';
import { PerformCreateComponent } from './perform-create/perform-create.component';

const routes: Routes = [
  {
    path: "", component: HomePageComponent,
  },
  {
    path: "profile", component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edituser", component: UserUpdateComponent,
    canActivate: [RoleGuard]
  },
  {
    path: "login", component: UserLoginComponent,
  },
  {
    path: "register", component: UserRegisterComponent,
  },
  {
    path: "newscreate", component: NewsCreateComponent,
    canActivate: [RoleGuard]
  },
  {
    path: "linelogin", component: LineLoginComponent,
    // canActivate:[AuthGuard]
  },
  {
    path: "findband", component: FineBandComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "chooseband", component: ContactBandComponent,
  },
  {
    path: "notification", component: NotificationComponent,
  },
  {
    path: "contactband", component: ContactBandComponent,
  }
  ,{
    path: "userdetail" ,component : UserDetailComponent,
  },
  {
    path: "header" ,component : NavHeadComponent,
  },{
    path: "band" ,component : BandPageComponent,
  },{
    path: "profilepage" ,component : ProfilePageComponent,
  },{
    path: "userdetail",component : UserDetailComponent,
  },{
    path : "perform" , component : UserPerformComponent,
  },{
    path : "performcreate" , component : PerformCreateComponent,
    
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
