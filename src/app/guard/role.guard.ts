import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MasterService } from '../service/master.service';
import { Router, RouterModule, Routes } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private service: MasterService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.service.HaveRoleAccess(route.url[0].path)) {
      return true;
    } else {
      alert('คุณไม่มีสิทธิ');
      this.route.navigate(['']);
      return false;
    }
    
  }
}
