import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { LocalService } from '../local.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-nav-head',
  templateUrl: './nav-head.component.html',
  styleUrls: ['./nav-head.component.css'],
})
export class NavHeadComponent implements OnInit{
  butinv: boolean = true;
  session : any;
  constructor(
    private router: Router,
    private localStore: LocalService
  ) {
    
  }

  ngOnInit() {
    const email = localStorage.getItem('email');
    if (email == '' || email == null) {
      this.butinv = true;
    } else {
      this.butinv = false;
    }
    const U : any = this.localStore.getData('U');
    this.session = U
  } 

  logout(){
    localStorage.clear()
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
  // open() {
	// 	const modalRef = this.modalService.open(NgbdModalContent);
	// 	modalRef.componentInstance.name = 'World';
	// }
}
