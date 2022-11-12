import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { LocalService } from '../local.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private localStore: LocalService) {}

  IsLoggedIn() {
    const email = localStorage.getItem('email');
    if (email == '' || email == null) {
      return false;
    } else {
      return true;
    }
  }

  HaveRoleAccess(menuname : any) {

    const role = this.localStore.getData('role');
    if (role == '1') {
      return true;
    } else {
      return false;
    }
  }
}
