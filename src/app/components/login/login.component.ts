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

    // let teste = this.authService.canUserAcessPortal(userCredentials).subscribe(
    //   response = > {}
    // );

    this.authService.canUserAcessPortal(userCredentials).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log('erro', error.error);
        // const errorResponse: EduMetricsApiReponse = error.message;
        this.msgService.add({ severity: 'error', summary: 'Erro', detail: error.error.message });
      }

    )
    // console.log(teste);
    // this.authService.getUserByEmail(email as string).subscribe(
    //   response => {
    //     if (response.length > 0 && response[0].password === password) {
    //       sessionStorage.setItem('email', email as string);
    //       this.router.navigate(['/home']);
    //     } else {
    //       this.msgService.add({ severity: 'error', summary: 'Erro', detail: 'Email e/ou senha estão incorretos' });
    //     }
    //   },
    //   error => {
    //     this.msgService.add({ severity: 'error', summary: 'Erro', detail: 'Ops! Alguma coisa deu errado! ' });
    //   }

    // )
  }
}
