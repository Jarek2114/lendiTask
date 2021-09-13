import { User } from './user';

export interface UserState {
    users: User[],
    errors: any[]
}