class auth {
	constructor() {
		this.isLoggedIn = false;
	}

	checkLoggedIn = () => {
		return this.isLoggedIn;
	}

	login = () => {
		this.isLoggedIn = true;
	};
}

export default auth;