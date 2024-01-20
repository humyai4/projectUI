import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  butedit: boolean = true;
  id: any;
  role: any;
  tellNumb : any;
  profile : any ='';

  userUpdateForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    firstName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    tell: [''],
    gender: [''],
    password: [''],
    lineid:[''],
    role: [''],
    id: [''],
  });


  constructor(
    private router: Router,
    private localStore: LocalService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }


  
  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    this.role = this.localStore.getData("role");
    let url = (`http://180.183.246.177:1114/user/userid?user=${this.id}`)
    this.http
      .get<any[]>(url).subscribe((response) => {
        this.profile = response;
        this.setUpdateProfile(this.profile)
      }); 
  }

  setUpdateProfile(event:any): void {
    this.userUpdateForm.patchValue({
      username: event.username,
      firstName: event.fname,
      lastName: event.lname,
      email: event.email,
      tell : event.tellNumb,
      gender: event.gender,
      password: event.password,
      lineid : event.lineid,
      role: this.role,
      id: this.id
     });
  }


  buttonedit(): void {
    this.butedit = false
  }
  buttoneditcancle(): void {
    this.butedit = true
  }

  userupdateFormSubmit(): void {
    const userUpdateForm = new FormData();
    const formData = this.userUpdateForm.value;
    userUpdateForm.append('username', formData.username)
    userUpdateForm.append('fName', formData.firstName)
    userUpdateForm.append('lName', formData.lastName)
    userUpdateForm.append('email', formData.email)
    userUpdateForm.append('tellNumb', formData.tell)
    userUpdateForm.append('gender', formData.gender)
    userUpdateForm.append('password',formData.password)
    userUpdateForm.append('role',formData.role)
    userUpdateForm.append('id',formData.id)
    let url = (`http://180.183.246.177:1114/user/update`)
    this.http.post(url,userUpdateForm).toPromise()
    .then((resp:any)=>{
      this.localStore.saveData('email',formData.email)
      this.localStore.saveData('role', formData.role);
      this.localStore.saveData('U', formData.username)
      window.location.reload();
    })
  }
}
