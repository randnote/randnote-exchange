interface module {
    institution_id: number;
    teacher_id: number;
    name: string;
    course_code: string;
    active: boolean;
}
interface singleValueObject {
    module_id: number;
}
export default class Module {
    private institution_id;
    private teacher_id;
    private name;
    private course_code;
    private active;
    constructor(module: module);
    static create(newmodule: any, result: any): void;
    static getAll(result: any): void;
    static getNumberOfStudentsPerModule(module_id: number, result: any): void;
    static linkStudentToModule(theobject: any, result: any): void;
    static linkTeacherToModule(theobject: any, result: any): void;
    static getAllModulesPerStudent(student_id: number, result: any): void;
    static deactivateModule(theobject: singleValueObject, result: any): void;
    static activateModule(theobject: singleValueObject, result: any): void;
    static getTeacherModuleConnections(teacher_id: number, result: any): void;
    static getTeacherModulesGivenTheirIds: (array: any, result: any) => void;
}
export {};
