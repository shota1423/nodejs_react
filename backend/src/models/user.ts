export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class User implements IUser {
  private _id?: number;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(name: string = '', email: string = '', password: string = '', id?: number) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
