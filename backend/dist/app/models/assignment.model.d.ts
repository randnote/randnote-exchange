interface assignment {
    institution_id: number;
    teacher_id: number;
    title: string;
    description: string;
    unique_code: string;
    total_grade: boolean;
    due_date: string;
    date_available: string;
    date_created: string;
}
export default class Assignment {
    private institution_id;
    private teacher_id;
    private title;
    private description;
    private unique_code;
    private total_grade;
    private due_date;
    private date_available;
    private date_created;
    constructor(assignment: assignment);
    static create(newassignment: any, result: any): void;
    static getAssignmentsFromInstitute(institution_id: number, module_id: number, result: any): void;
}
export {};
