export interface Note {
    id: string,
    title: string,
    description: string
}

export interface User {
    id: string,
    username: string,
    password: string,
    notes: Array<string>
}