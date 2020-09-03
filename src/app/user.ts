export class User {
    username: string;
    email: string;
    password: string;
    id: number;
    role: string;
    valid: boolean;
    constructor(username:string='', email:string='', password:string='', valid=false){
        this.username = username;
        this.email = email;
        this.password = password;
        this.valid = valid;
    }
}