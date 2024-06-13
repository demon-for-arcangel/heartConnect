export interface User {
    uid?: number;
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

    id_user?: number;
    id_friendship?: number;
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

export interface UserFriendship {
    id: number;
    firstName?: string;
    lastName?: string;

    id_user?: number;
    id_friendship?: number;
}