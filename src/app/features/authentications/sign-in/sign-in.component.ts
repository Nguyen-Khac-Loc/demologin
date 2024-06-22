import { AuthenticationService } from './../services/authentication.service';
import { Component, OnDestroy } from '@angular/core';
import SignInRequest from '../models/sign-in-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SignInResponse } from '../models/sign-in-response.model';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {
	model: SignInRequest;
	private signInSubscribtion?: Subscription;

	constructor(private authenticationService: AuthenticationService, private router: Router) {
		this.model = {
			username: '',
			password: ''
		};
	}


	onFormSubmitted() {
		this.signInSubscribtion = this.authenticationService.login(this.model)
			.subscribe({
				next: (response: SignInResponse) => {
					if (response.successed) {
						console.log(response);
						this.router.navigateByUrl('home/dashboard');
					}
					else {
						console.log(response);
					}
				},
			});
	}

	ngOnDestroy(): void {
		this.signInSubscribtion?.unsubscribe();
	}
}
