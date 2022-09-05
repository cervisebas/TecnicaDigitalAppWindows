import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ApiActions {
    constructor() {}
    verifySession(): Promise<null> {
        return new Promise((resolve, reject)=>
            AsyncStorage.getItem('DataSession').then((value)=>{
                if (value !== null) return resolve(null);
                reject();
            }).catch(reject)
        );
    }
}