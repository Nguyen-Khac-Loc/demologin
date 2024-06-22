export interface SignInResponse {
	successed: boolean,
	message: string;
	data: {
		token: string;
		userInfo: {

		}
	},
	err: {}
}