export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    domicile?: string;
    born_date?: Date;
    active?: boolean;
    roles?: Role[];
    photo_profile?: number;
}

export interface Role {
    id: number;
    name?: string;
}

export interface UserRol {
    id: number;
    roles: Role[];
}