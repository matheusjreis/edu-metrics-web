import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials } from '../interfaces/auth';
import { EduMetricsApiReponse } from '../interfaces/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7298/login';

  constructor(private http: HttpClient) { }  

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  authenticateUser(userCredentials: UserCredentials){
    return this.http.post<EduMetricsApiReponse>(`${this.baseUrl}/authenticate`, userCredentials);
  }
}
