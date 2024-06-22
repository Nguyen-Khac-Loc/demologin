import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import SignInRequest from '../models/sign-in-request.model';
import { Observable } from 'rxjs';
import { SignInResponse } from '../models/sign-in-response.model';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private http: HttpClient) { }

	login(request: SignInRequest): Observable<SignInResponse> {
		return this.http.post<SignInResponse>(`${environment.baseUrl}/api/identity/auth/login`, {
			username: request.username,
			password: request.password
		});
	}
}
