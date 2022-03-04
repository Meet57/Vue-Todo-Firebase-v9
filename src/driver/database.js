import firebase from "../firebase";
const { read, deletedoc, adddoc, updatedoc } = firebase;

class Database {
    user = null;
    constructor() {}
    read() {
        return read();
    }
    deletedoc(id) {
        return deletedoc(id);
    }
    add(data) {
        return adddoc(data);
    }
    updatedoc(data) {
        return updatedoc(data);
    }
}
export default Database;
