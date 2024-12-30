import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly UsersService = inject(UsersService);
  private readonly Router = inject(Router);
  private readonly FormBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  msgError: string = "";

  loginForm: FormGroup = this.FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  submitLogin(): void {
    if(this.loginForm.valid){
      this.isLoading = true;
      this.UsersService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          localStorage.setItem('token', res.token)
          this.Router.navigate(['/timeline']);
        },
        error: (error) => {
          this.isLoading = false;
          this.msgError = error.error.message;
          console.log(error);
          
        }
      });
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}

