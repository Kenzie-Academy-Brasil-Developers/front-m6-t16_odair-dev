export interface IUserAnnouncement {
  id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  type: string;
}

export interface IUserUpdate {
  id: string;
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  type: string;
  Address: IAddressUser;
}

interface IAddressUser {
  id: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;
  user_id: string;
}

interface ImgAnnouncement {
  id: string;
  url: string;
  announcement_id: string;
}
interface IUserComment {
  id: string;
  name: string;
}
interface IComment {
  id: string;
  comment: string;
  user_id: string;
  createdAt: string;
  announcement_id: string;
  user: IUserComment;
}
export interface IAnnouncement {
  id: string;
  mark: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  color: string;
  price: number;
  fipe: number;
  description: string;
  user: IUserAnnouncement;
  image: ImgAnnouncement[];
  comment: IComment[];
}

interface IUserDecoded {
  description: string;
  exp: number;
  iat: number;
  name: string;
  sub: string;
  type: string;
}

export interface IDecoded {
  decoded: IUserDecoded;
}

interface IAddress {
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;
}

export interface IRegister {
  email: string;
  name: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  password: string;
  type: string;
  Address: IAddress;
}
