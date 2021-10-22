interface person {
    institution_id: number;
    firstname: string;
    lastname: string;
    staffnumber: string;
    password: string;
    active: string;
}
export default class Admin {
    private institution_id;
    private firstname;
    private lastname;
    private staffnumber;
    private password;
    private active;
    constructor(admin: person);
    static create(newadmin: any, result: any): void;
    static getAll(result: any): void;
    static findById(admin: any, result: any): void;
    static login(obj: any, result: any): void;
}
export {};
