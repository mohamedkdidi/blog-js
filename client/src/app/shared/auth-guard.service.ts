import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export  class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private toastr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        console.log(this.authService.isLoggedIn());
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.toastr.info("Please login to access this page.")
        this.router.navigate(['/login']);
        return false;
    }
}
