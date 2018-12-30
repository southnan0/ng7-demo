export class Account {
  accountId: number;
  userName: string;
  accountType: number;
  loginName: string;
  mobile: string;
  status: number;
  createdTime: number;
  createdBy: number;
  orgIds: string;
  roleIds: string;
  password: string;
}

export class Resp<T> {
  [propertName: string]: T;
}
