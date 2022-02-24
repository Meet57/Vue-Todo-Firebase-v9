import Vue from "vue";
import Vuex from "vuex";

import * as task from "./modules/task";
import * as auth from "./modules/auth";
import * as alert from "./modules/alert";

Vue.use(Vuex);

// Create a new store instance.
export const store = new Vuex.Store({
    modules: {
        task,
        auth,
        alert,
    },
    actions: {
        alert(context, payload) {
            console.log(payload);
        },
    },
    // strict: true,
    // This will restrict outside files to edit Vuex store
});

// let arr = [
//     {
//         todo: "Lacy Oughton",
//         status: true,
//         color: "#85f099",
//     },
//     {
//         todo: "Matt Cargo",
//         status: false,
//         color: "#b55fef",
//     },
//     {
//         todo: "Vite O' Scallan",
//         status: false,
//         color: "#3f267f",
//     },
//     {
//         todo: "Allyn Ewers",
//         status: true,
//         color: "#e925a2",
//     },
//     {
//         todo: "Gannie Aizikov",
//         status: false,
//         color: "#395e6e",
//     },
//     {
//         todo: "Julius Wigin",
//         status: false,
//         color: "#9531f3",
//     },
//     {
//         todo: "Berte Leinster",
//         status: true,
//         color: "#5a5573",
//     },
//     {
//         todo: "Cece Skrzynski",
//         status: false,
//         color: "#deeda6",
//     },
//     {
//         todo: "Janette Ellerman",
//         status: false,
//         color: "#809f9a",
//     },
//     {
//         todo: "Micaela Hacquel",
//         status: true,
//         color: "#994d61",
//     },
//     {
//         todo: "Matthias Petegre",
//         status: true,
//         color: "#2a79a7",
//     },
//     {
//         todo: "Muire Novak",
//         status: false,
//         color: "#01a74c",
//     },
//     {
//         todo: "Kareem Scapens",
//         status: false,
//         color: "#4ea3ae",
//     },
//     {
//         todo: "Federico Mapledoore",
//         status: true,
//         color: "#1727ce",
//     },
//     {
//         todo: "Moreen Huet",
//         status: false,
//         color: "#45a137",
//     },
//     {
//         todo: "Terri Sherston",
//         status: true,
//         color: "#75b8da",
//     },
//     {
//         todo: "Adler Umpleby",
//         status: false,
//         color: "#954550",
//     },
//     {
//         todo: "Kelci Brockington",
//         status: true,
//         color: "#1f9308",
//     },
//     {
//         todo: "Engelbert Stanhope",
//         status: false,
//         color: "#af54de",
//     },
//     {
//         todo: "Maynord Twinbourne",
//         status: true,
//         color: "#42f16b",
//     },
// ];

// arr.forEach((data) => {
//     let colorName = name(data.color)[1];
//     addDoc(db, { ...data, colorName, createdAt: serverTimestamp() }).then(() => {
//         console.log("added");
//     });
// });
