import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
  }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    username: this.username,
    password: this.password,
  });


  loginUser(formdata:any): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.toastr.error(data.json().message, 'Blog JS', 
            {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-bottom-right',
            });
            
          } else {
            this.toastr.success('Login successful.', 'Blog JS', 
            {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-bottom-right',
            });
            
            this.router.navigate(['/post']);
          }
          this.loginForm.reset();
        });
    }
  }
  
}
