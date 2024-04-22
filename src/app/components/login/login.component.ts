import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserCredentials } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    const { email, password } = this.loginForm.value;

    const userCredentials = <UserCredentials>({
      userName: email,
      userPassword: password
   });

    this.authService.canUserAcessPortal(userCredentials).subscribe(
      response => {
        this.msgService.add({ severity: 'success', summary: 'Successo', detail: 'Usuário autenticado!' });
        this.router.navigate(['home']);
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Erro', detail: error.error.message });
      }
    )
  }

  // setAuthenticatedUserData(){

  // }
}
