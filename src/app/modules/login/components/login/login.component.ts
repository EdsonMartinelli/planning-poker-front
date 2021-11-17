import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { validatorError } from 'src/app/shared/functions/validatorError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private storage: Storage;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.storage = window.localStorage;
  }

  hide = true;
  isLoading = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [this.storage.getItem('planning-poker-checkemail'), [Validators.required, Validators.email]],
      checkemail: [this.storage.getItem('planning-poker-checkemail')?true:false],
      password: [, [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm() {
    if (this.form.valid && this.form.dirty) {
      if(this.form.value.checkemail) {
        this.storage.setItem('planning-poker-checkemail',this.form.value.email)  
        console.log(this.form.value)
    } else { 
        this.storage.removeItem('planning-poker-checkemail')

    }
      this.isLoading = true;
      this.userService.login(this.form.value)
        .pipe(
          finalize(() => {
            this.isLoading = false
          })
        )
        .subscribe((res) => {
          const { token } = res
          this.authService.setJwtToLocalStorage(token)
          this.router.navigate(['poker'])
        });
    }
    
}

  getErrorMessage(field: string){
    return validatorError(field, this.form);
  }
}