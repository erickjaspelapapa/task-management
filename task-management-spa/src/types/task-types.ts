
export type TaskRaw = {
    id:string;
    task_title?: string;
    description? : string;
    estimation?: number;
    created_by?: string;
    status?:TaskStatus;
};

export enum TaskStatus  { 
    NotStarted,
    InProgress,
    Done
}