import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public httpOptions: any;
  _baseUrl: string = "https://localhost:44345";
  userData: User = new User();

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json; charset=utf-8'
        }
      )
    }
  }

  signin(data) {
    let requestUrl = `${this._baseUrl}/api/Users/signin?email=${data.email}&password=${data.password}`;
    console.log(this.http.get<string>(requestUrl))
    return this.http.get<string>(requestUrl);
  }

  signup(data: any) {
    let requestUrl = `${this._baseUrl}/api/Users/signup`;
    return this.http.post(requestUrl, data);
  }

  checkingEmail(email: string) {
    let requestUrl = `${this._baseUrl}/api/Users/checking_email?email=${email}`;
    return this.http.get<boolean>(requestUrl);
  }

  userDelete(id: number) {
    let requestUrl = `${this._baseUrl}/api/Users/${id}`;
    return this.http.delete(requestUrl);
  }

  updatePermission(userData: User) {
    let requestUrl = `${this._baseUrl}/api/Users/${userData.Id}`;
    return this.http.put(requestUrl, userData);
  }
}
