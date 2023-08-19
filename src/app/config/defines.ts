import { User } from '../shared/_models/user.model';
import { Role } from '../shared/_models/role';
/** USERS */
export const USERS: User[] = [
    { id: 1, username: 'admin', password: 'admin', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', role: Role.User }
];
/** DISPLYED_COLUMNS */
export const DISPLYED_COLUMNS = ['id', 'title', 'category', 'price', 'image', 'edit', 'delete'];