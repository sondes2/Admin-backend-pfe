import {Groupe} from "./groupe";

export class User {
  idUser: number;
  firstName: string;
  lastName: string;
  telNum: number;
  birthdate: string;
  address: string;
  mail: string;
  login: string;
  password: string;
  lockTime: string;
  valid: boolean;
  groupe: Groupe;
}
