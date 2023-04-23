export interface FormData {
    key: string;
    message: string;
    operation: 'decrypt' | 'encrypt';
}

export interface Letters {
    [key: string]: number;
}
