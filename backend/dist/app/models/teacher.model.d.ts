interface person {
    firstname: string;
    lastname: string;
    idnumber: number;
    staffnumber: number;
    institution_id: number;
    password: string;
    active: string;
}
export default class Teacher {
    private firstname;
    private lastname;
    private idnumber;
    private staffnumber;
    private institution_id;
    private password;
    private active;
    constructor(teacher: person);
    static create(newteacher: any, result: any): void;
    static getAll(result: any): void;
    static findById(teacher: any, result: any): void;
    static login(obj: any, result: any): void;
    static teachersFromInstitution(institution_id: any, result: any): void;
}
export {};
