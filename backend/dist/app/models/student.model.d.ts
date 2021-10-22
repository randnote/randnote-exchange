interface person {
    firstname: string;
    lastname: string;
    idnumber: number;
    studentnumber: number;
    institution_id: number;
    password: string;
    active: string;
}
export default class Student {
    private firstname;
    private lastname;
    private idnumber;
    private studentnumber;
    private institution_id;
    private password;
    private active;
    constructor(student: person);
    static create(newstudent: any, result: any): void;
    static getAll(result: any): void;
    static findById(student: any, result: any): void;
    static login(obj: any, result: any): void;
    static studentsIdsFromInstitution(institution_id: any, result: any): void;
}
export {};
