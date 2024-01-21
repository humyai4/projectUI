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
import { FineBandComponent } from './fine-band/fine-band.component';
import { ContactBandComponent } from './contact-band/contact-band.component';
import { NotificationComponent } from './notification/notification.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BandPageComponent } from './band-page/band-page.component';
import { UserPerformComponent } from './user-perform/user-perform.component';
// import { DataTablesModule } from "angular-datatables";
import { FilterPipe } from './filter.pipe';
import { PerformCreateComponent } from './perform-create/perform-create.component';
import { BandDetailPageComponent } from './band-detail-page/band-detail-page.component';
import { ContactToMeComponent } from './contact-to-me/contact-to-me.component';



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
    LineLoginComponent,
    FineBandComponent,
    ContactBandComponent,
    NotificationComponent,
    UserDetailComponent,
    ProfilePageComponent,
    BandPageComponent,
    UserPerformComponent,
    FilterPipe,
    PerformCreateComponent,
    BandDetailPageComponent,
    ContactToMeComponent
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
