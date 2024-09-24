import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials } from '../../interfaces/auth';
import { EduMetricsApiReponse } from '../../interfaces/response';
import { FormBuilder, Validators } from '@angular/forms';
import { UserIp } from 'src/app/interfaces/userIp';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    private baseUrl = 'https://localhost:7298';
  
    constructor(private http: HttpClient,
          private userService: UserService,
          private snackBar: MatSnackBar,
          private formBuilder: FormBuilder,
          private router: Router) { }  
  
    getUserByEmail(email: string) {
      return this.http.get<User>(`${this.baseUrl}/login/users?email=${email}`);
    }
  
    authenticateUser(userCredentials: UserCredentials){
      this.userService.getUserIP().subscribe(
        response => {
          const { email, password } = this.loginForm.value;
          const userIp: UserIp = response;
          const userCredentials = <UserCredentials>({
            userName: email,
            userPassword: password
          });
  
          this.authenticateUser(userCredentials).subscribe(
            response => {
              this.snackBar.open('Não se esqueça de clicar em logout ao terminar a sessão!', 'OK');
              localStorage.setItem('userToken', response.data!);
              this.router.navigate(['home']);
            },
            error => {
              this.snackBar.open('Usuário não autorizado!', 'Fechar');
            }
          )
          
        },
        error => {
          this.snackBar.open('Não foi possível buscar IP!', 'Fechar');
        }
      );  
      return this.http.post<EduMetricsApiReponse>(`${this.baseUrl}/login/authenticate`, userCredentials);
    }
  
    isSessionActivated(){
      const token = localStorage.getItem("userToken");
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      return this.http.post<EduMetricsApiReponse>(
        `${this.baseUrl}/session/is-user-session-activated`,
        null,
        { headers: headers }
      );
    }
  }
  