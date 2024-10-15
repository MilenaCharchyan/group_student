export interface IStudent {
    id: number;
    name: string;
    surname: string;
  }
  
  export interface IGroup {
    id: number;
    name: string;
    maxStudents: number;
    students: IStudent[];
  }
  
  export interface IAddGroupFormValues {
    name: string;
    maxStudents: number;
  }
  
  export interface IAddStudentFormValues {
    name: string;
    surname: string;
  }
  