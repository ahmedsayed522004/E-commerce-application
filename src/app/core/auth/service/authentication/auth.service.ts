import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { UserData, UserDataResponse } from '../../models/user/user-data.interface';
import { jwtDecode } from 'jwt-decode';
import { stored_Keys } from '../../../constants/storedKeys';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly HttpClient = inject(HttpClient);
  private readonly router = inject(Router);

  userDataDecoded: any = null;
  sendRegisterData(userdata: UserData): Observable<UserDataResponse> {
    return this.HttpClient.post<UserDataResponse>(environment.base_url + 'auth/signup', userdata);
  }
  sendLoginData(userdata: UserData): Observable<UserDataResponse> {
    return this.HttpClient.post<UserDataResponse>(environment.base_url + 'auth/signin', userdata);
  }

  forgetPassword(email: string): Observable<any> {
    return this.HttpClient.post<any>(environment.base_url + 'auth/forgotPasswords', {
      email: email,
    });
  }

  verifyResetCode(data: { resetCode: string | null }): Observable<any> {
    return this.HttpClient.post<any>(environment.base_url + 'auth/verifyResetCode', data);
  }
  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this.HttpClient.put<any>(environment.base_url + 'auth/resetPassword', data);
  }
  changePassword(data: {
    currentPassword: string;
    password: string;
    rePassword: string;
  }): Observable<any> {
    return this.HttpClient.put(environment.base_url + 'users/changeMyPassword', data);
  }

  decodeUserToken(): void {
    const token = localStorage.getItem(stored_Keys.userToken)!;
    this.userDataDecoded = jwtDecode(token);

    console.log(this.userDataDecoded, 'user-data');
  }

  userLogout(): void {
    localStorage.removeItem(stored_Keys.userToken);
    this.router.navigate(['/login']);
  }
}
