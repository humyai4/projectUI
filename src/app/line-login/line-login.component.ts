import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-line-login',
  templateUrl: './line-login.component.html',
  styleUrls: ['./line-login.component.css'],
})
export class LineLoginComponent implements OnInit {
  constructor(
    private localStore: LocalService,
    private router: Router) {}



  ngOnInit(): void {


    liff.init({ liffId: '1657606401-WgJpKdqY' });
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
liff.getProfile().then(profile => {
      alert(profile.userId)
    document.getElementById("userId");
    this.localStore.saveData('LINE_UID',profile.userId);
    console.log(profile,profile.userId);
    })

      } else {
        liff.login()
      }
    });
  }


  runApp(): void {


  }
}
