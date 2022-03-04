import firebase from "../firebase";

const { auth, login, signup, signout } = firebase;

class Auth {
    constructor() {}
    getlogindetails() {
        return auth.currentUser;
    }
    login(email, pass) {
        return login(email, pass);
    }
    signup(email, pass) {
        return signup(email, pass);
    }
    signout() {
        return signout();
    }
}

export default Auth;
