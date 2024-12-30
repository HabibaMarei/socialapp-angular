import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent {
  private readonly _UsersService = inject(UsersService)
  private readonly _Router = inject(Router)
  private readonly _FormBuilder = inject(FormBuilder)
  isLoading: boolean = false;
  msgError: string = "";

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    rePassword: [null, Validators.required],
    dateOfBirth: [null, Validators.required],
    gender: [null, Validators.required]
  },{validator: this.checkConfirmPassword})
  registerSubmit(): void {
    if(this.registerForm.valid){
      this.isLoading = true;
      this._UsersService.SignUp(this.registerForm.value).subscribe({
        next: (res) => {
          if(res.message == 'success'){
            this._Router.navigate(['/signin']);
          }
          this.isLoading = false;
        },
        error: (error:HttpErrorResponse) => {
          this.msgError = error.error.message;
          this.isLoading = false;
          console.log(error);
          
        }
      })
    }
    else {
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  } 

  checkConfirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }
}
