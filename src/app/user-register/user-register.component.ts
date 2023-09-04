import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  public roles: any;
  private _success = new Subject<string>();
  private _login = new Subject<string>();
  successMessage = '';
  status: any;

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password1: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert:
    | NgbAlert
    | any;
  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(4000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
        this._success.next('');
      }
    });
  }
  get firstName(): any {
    return this.registerForm.get('firstName');
  }
  get lastName(): any {
    return this.registerForm.get('lastName');
  }
  get email(): any {
    return this.registerForm.get('email');
  }
  get password(): any {
    return this.registerForm.get('password');
  }
  get password1(): any {
    return this.registerForm.get('password1');
  }

  // SAVEREGISTER
  registerFormSubmit(): void {
    const userRegister = new FormData();
    const formData = this.registerForm.value;
    userRegister.append('email', formData.email);
    let url = 'http://180.183.246.177:1114/user/checkEmail';

    this.http
      .post(url, userRegister)
      .toPromise()
      .then((resp: any) => {
        this.status = resp.status;
        if (formData.password1 != formData.password) {
          this._success.next(`พาสเวิดไม่ตรงกัน.`);
          this.password.reset();
          this.password1.reset();
          console.log(this.successMessage);
        } else if (this.status == 0) {
          this._success.next(`Email ซ้ำ`);
          console.log(this.successMessage);
        } else {
          console.log('ok200');
          const userRegister = new FormData();
          const UserNames = "user" + Math.floor(Math.random() * 900000);
          this.roles = '3';
          userRegister.append('email', formData.email);
          userRegister.append('password', formData.password);
          userRegister.append('role', this.roles);
          userRegister.append('username', UserNames);
          userRegister.append('fName', formData.firstName);
          userRegister.append('lName',formData.lastName);
          let url = 'http://180.183.246.177:1114/user/register';
          this.http
            .post(url, userRegister)

            .toPromise()
            .then((resp: any) => {
              this.router.navigate(['login']);
              console.log(resp)
            });

          console.log(this.successMessage);
        }
      });
  }
}
