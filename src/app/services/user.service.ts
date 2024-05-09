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
    return this.http.post(`${this.baseUrl}`, userDetails);
  }

  setUserDataOnLocalStorage(userDetails: User){
    localStorage.setItem("userInformations", JSON.stringify(userDetails));
  }

  cleanUserDataOnLocalStorage(){
    localStorage.removeItem("userInformations");
  }

  getUserInformationOnLocalStorage(){
    let cachedUser: string | null = localStorage.getItem("userInformations");

    if(cachedUser != null){
      let userInformations: User = JSON.parse(cachedUser);

      console.log(userInformations)
      return userInformations;
    } else {
      return null;
    }
  }
}


