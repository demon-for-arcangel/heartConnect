export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    domicile?: string;
    born_date?: string;
    active?: boolean;
    phone_number?: string;
    roles?: Role[];
    photo_profile?: number;
}

export interface Role {
    id: number;
    name?: string;
    admin?: string;
}

export interface UserRol {
    id: number;
    roles: Role[];
}