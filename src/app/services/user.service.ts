import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7298/user-register';

  constructor(private http: HttpClient) { }  

  registerUser(userDetails: User) {
    console.log(userDetails);
    return this.http.post(`${this.baseUrl}`, userDetails);
  }
}


