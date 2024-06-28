import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserCredentials } from 'src/app/interfaces/auth';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
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

    this.authService.authenticateUser(userCredentials).subscribe(
      response => {
        this.msgService.add({ severity: 'success', summary: 'Successo', detail: '[Nome], Não se esqueça de clicar em logout ao terminar a sessão!' });
        localStorage.setItem('userToken', response.data!);
        this.router.navigate(['home']);
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Erro', detail: error.error.message });
      }
    )
  }

  ngOnInit(): void {
   localStorage.clear();
  }
}