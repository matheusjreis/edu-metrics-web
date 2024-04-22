import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7298/login';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    console.log(userDetails);
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  canUserAcessPortal(userCredentials: UserCredentials){

    console.log('userCrendentials', userCredentials);
    return this.http.post(`${this.baseUrl}/authenticate`, userCredentials);
  }
}
