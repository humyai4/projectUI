import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private localStore: LocalService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

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

  get email(): any {
    return this.loginForm.get('email');
  }
  get password(): any {
    return this.loginForm.get('password');
  }

  loginFormSubmit(): void {
    const formData = this.loginForm.value;
    console.log('ok');
    const userLogin = new FormData();
    userLogin.append('email', formData.email);
    userLogin.append('password', formData.password);

    let url = 'http://180.183.246.177:1114/user/login';
    this.http
      .post(url, userLogin)
      .toPromise()
      .then((respon: any) => {
        console.log('ok', respon.status);
        if (respon.status == '') {
          this._success.next('เช็ค Email หรือ Password');
        } else {
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
          // localStorage.setItem('email',this.encrypt(formData.email));
          // localStorage.setItem('role',this.encrypt(respon.dataRole));
          this.localStore.saveData('email', formData.email);
          this.localStore.saveData('role', respon.dataRole);
          this.localStore.saveData('U', respon.data);
          localStorage.setItem('id', respon.data2);
        }
      });
    console.log(this.successMessage);
  }
}
