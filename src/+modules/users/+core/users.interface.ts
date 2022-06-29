import { USER_STATUS } from "./users.constants";

export interface IUser{
  userId:string,
  displayName:string,
  email?:string,
  status: USER_STATUS
}