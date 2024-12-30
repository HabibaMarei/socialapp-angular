import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() {
  }
  SignUp(data: object):Observable <any>{
    return this._HttpClient.post(`${environment.baseURL}users/signup`, data)
  }

  SignIn(data: object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}users/signin`, data)
  }

  ChangePassword(data: object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseURL}users/change-password`, data)
  }

  UploadProfileImage(data: object):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}users/upload-photo`, data)
  }

  GetUserData():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}users/profile-data`)
  }
  
}
