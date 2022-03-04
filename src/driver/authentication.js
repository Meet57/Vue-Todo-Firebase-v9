// import { login, signup, signout, currentuser } from "../firebase";

import firebase from "../firebase";
const { login, signup, signout, currentuser } = firebase;

class Auth {
    constructor() {}
    getlogindetails() {
        return currentuser;
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
