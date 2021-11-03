interface userType {
    firstname: string;
    lastname: string;
    email: string;
    verifiedEmail: boolean;
    password: string;
}
export default class User {
    private firstname;
    private lastname;
    private password;
    private email;
    private verifiedEmail;
    constructor(user: userType);
    static create(newuser: any, result: any): void;
    static getAll(result: any): void;
    static findById(user: any, result: any): void;
    static login(obj: any, result: any): void;
}
export {};
