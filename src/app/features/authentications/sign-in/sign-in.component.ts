import { AuthenticationService } from './../services/authentication.service';
import { Component, OnDestroy } from '@angular/core';
import SignInRequest from '../models/sign-in-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SignInResponse } from '../models/sign-in-response.model';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnDestroy {
	model: SignInRequest;
	private signInSubscribtion?: Subscription;
	loading = false;
	message: string | null = null;
	constructor(
		private authenticationService: AuthenticationService,
		private router: Router
	) {
		this.model = {
			username: '',
			password: '',
		};
	}

	onFormSubmitted() {
		this.loading = true;
		this.message = null;
		this.signInSubscribtion = this.authenticationService
			.login(this.model)
			.subscribe({
				next: (response: SignInResponse) => {
					this.loading = false;
					if (response.successed) {
						this.message = response.message;
						this.router.navigateByUrl('home/dashboard');
					} else {
						this.message = response.message;
					}
				},
				error: (err) => {
					this.loading = false;
					this.message = 'An error occurred. Please try again.';
				},
			});
	}

	ngOnDestroy(): void {
		this.signInSubscribtion?.unsubscribe();
	}
}
