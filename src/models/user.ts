import { Person } from "./person";

export class User implements Person {
    id = '';
    firstName = '';
    lastName = '';
    email = '';
    phone = '';
    birthDate: Date = new Date();
}