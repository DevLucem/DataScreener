import firebase from "firebase/app";
import  "firebase/firestore";
import "firebase/auth";
// @ts-ignore
import {FIREBASE, FIREBASE_LIVE} from "./KEYS.js";

firebase.initializeApp(FIREBASE);

const database = firebase.firestore();

const check_required = (required: string[], data: object) => {
    let accepted = true;
    required.forEach( val => {
        accepted = accepted && val in data;
        // todo check if value string/object/array is not empty
    });
    return accepted;
}

// @ts-ignore
export default {
    install(Vue: any, options: Object) {
        Vue.mixin({
            data(){return {
                FIREBASE: firebase,
                FIELD_VALUE: firebase.firestore.FieldValue,
                FIRESTORE: firebase.firestore(),
                DATA: database.collection('symbols'),
                FILTERS: database.collection('filters'),
                CONDITIONS: database.collection('conditions'),
            }},
            methods: {
                DatabaseVerify(type: String /*data being stored in database*/ , data: Object){
                    switch (type){
                        case 'task':
                            return check_required(['name'], data)
                        case 'project':
                            return check_required(['name', 'starting', 'ending', 'description', 'payment', 'charge'], data)
                        case 'employee':
                            return check_required(['name'], data)
                        case 'client':
                            return check_required(['name', 'contact'], data)
                        default: return false;
                    }
                }
            }
        });
    }
};
