import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeadComponent } from './nav-head/nav-head.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginComponent } from './user-login/user-login.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { NewsBarComponent } from './news-bar/news-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LineLoginComponent } from './line-login/line-login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavHeadComponent,
    UserRegisterComponent,
    UserLoginComponent,
    NewsBarComponent,
    HomePageComponent,
    UserUpdateComponent,
    NewsCreateComponent,
    UserProfileComponent,
    LineLoginComponent
  ],
  imports: [
    NgbPaginationModule, 
    NgbAlertModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
