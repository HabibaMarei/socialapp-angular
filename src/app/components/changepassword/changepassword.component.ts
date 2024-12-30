import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';``
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  private readonly UsersService = inject(UsersService);
  private readonly FormBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  msgError: string = "";

  changePasswordForm: FormGroup = this.FormBuilder.group({
    password: [null, [Validators.required, Validators.minLength(6)]],
    newPassword: [null, [Validators.required, Validators.minLength(6)]]

  })

  submitChangePassword(): void {
    if(this.changePasswordForm.valid){
      this.isLoading = true;
      this.UsersService.ChangePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          localStorage.setItem('token', res.token)
          console.log(res);
        },
        error: (error) => {
          this.isLoading = false;
          this.msgError = error.error.message;
          console.log(error);
          
        }
      });
    }
    else{
      this.changePasswordForm.markAllAsTouched();
    }
  }
}

