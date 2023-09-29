export interface User {
    id: number,
    name: string,
    email: string,
    hobbies: Hobbies
}

export type Hobbies = string[]