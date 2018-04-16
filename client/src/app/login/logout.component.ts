import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  template: ''
})

export class LogoutComponent implements OnInit {
  
    constructor(private authService: AuthService,
        private router: Router,
        private toastr: ToastrService) { 
    }

    ngOnInit(){
        this.authService.logout();
        this.toastr.success('You have been logged out.');
        this.router.navigate(['login']);
    }

    

}